/**
 * ------------------------------------------------------------
 * INSERT ELEVATOR STOPS
 * ------------------------------------------------------------
 *
 * Behavior:
 * - Inserts one or more stops for a given elevator.
 * - Ensures elevator stops (for a given elevator) remain a single continuous vertical chain.
 * - If gaps are introduced:
 *      → returns 409 with missing floor numbers
 *      → frontend may retry with { auto_fill: true }
 * - After success, returns warning if building has floors not served by ANY transport shaft.
 *
 * Enforced at API level:
 * - All floors must belong to shaft’s building
 * - Shaft must have no internal floor gaps
 *
 * Enforced at DB level:
 * - No duplicate (shaft_id, floor_id)
 * - Referential integrity
 * - Undirected connection ordering
 */

const express = require("express");
const router = express.Router();

router.post("/transport-shafts/:shaftId/stops", async (req, res) => {
  const db = req.app.locals.db;
  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    const shaftId = Number(req.params.shaftId);
    const { floor_ids, auto_fill } = req.body;

    if (!Array.isArray(floor_ids) || floor_ids.length === 0) {
      return res.status(400).json({ error: "floor_ids must be non-empty array" });
    }

    // -------------------------------------------------
    // 1) Validate shaft
    // -------------------------------------------------
    const [shaftRows] = await connection.execute(
      `SELECT building_id FROM transport_shaft WHERE shaft_id = ?`,
      [shaftId]
    );

    if (shaftRows.length === 0) {
      return res.status(404).json({ error: "Transport shaft not found" });
    }

    const buildingId = shaftRows[0].building_id;

    // -------------------------------------------------
    // 2) Validate floors belong to building
    // -------------------------------------------------
    const placeholders = floor_ids.map(() => "?").join(",");

    const [floorRows] = await connection.query(
      `
      SELECT floor_id, floor_number
      FROM floor
      WHERE floor_id IN (${placeholders})
        AND building_id = ?
      `,
      [...floor_ids, buildingId]
    );

    if (floorRows.length !== floor_ids.length) {
      return res.status(400).json({
        error: "One or more floors do not exist or do not belong to this building"
      });
    }

    // -------------------------------------------------
    // 3) Insert requested stops
    // -------------------------------------------------
    for (const floor of floorRows) {
      await connection.execute(
        `INSERT INTO transport_stop (shaft_id, floor_id)
         VALUES (?, ?)`,
        [shaftId, floor.floor_id]
      );
    }

    // -------------------------------------------------
    // 4) Fetch ALL stops for shaft
    // -------------------------------------------------
    const [allStops] = await connection.execute(
      `
      SELECT ts.stop_id, f.floor_number
      FROM transport_stop ts
      JOIN floor f ON ts.floor_id = f.floor_id
      WHERE ts.shaft_id = ?
      ORDER BY f.floor_number
      `,
      [shaftId]
    );

    const floorNumbers = allStops.map(s => s.floor_number);

    // -------------------------------------------------
    // 5) Detect internal gaps
    // -------------------------------------------------
    let missing = [];

    for (let i = 0; i < floorNumbers.length - 1; i++) {
      if (floorNumbers[i + 1] !== floorNumbers[i] + 1) {
        for (
          let f = floorNumbers[i] + 1;
          f < floorNumbers[i + 1];
          f++
        ) {
          missing.push(f);
        }
      }
    }

    if (missing.length > 0) {
      if (!auto_fill) {
        await connection.rollback();
        return res.status(409).json({
          error: "Transport shaft would contain gaps",
          missing_floors: missing
        });
      }

      // Auto-fill missing stops
      const [rangeFloors] = await connection.execute(
        `
        SELECT floor_id, floor_number
        FROM floor
        WHERE building_id = ?
          AND floor_number BETWEEN ? AND ?
        ORDER BY floor_number
        `,
        [
          buildingId,
          floorNumbers[0],
          floorNumbers[floorNumbers.length - 1]
        ]
      );

      for (const floor of rangeFloors) {
        await connection.execute(
          `INSERT IGNORE INTO transport_stop (shaft_id, floor_id)
           VALUES (?, ?)`,
          [shaftId, floor.floor_id]
        );
      }
    }

    // -------------------------------------------------
    // 6) Re-fetch final stops
    // -------------------------------------------------
    const [finalStops] = await connection.execute(
      `
      SELECT ts.stop_id, f.floor_number
      FROM transport_stop ts
      JOIN floor f ON ts.floor_id = f.floor_id
      WHERE ts.shaft_id = ?
      ORDER BY f.floor_number
      `,
      [shaftId]
    );

    // -------------------------------------------------
    // 7) Create vertical edges between adjacent stops
    // -------------------------------------------------
    for (let i = 0; i < finalStops.length - 1; i++) {
      let idA = finalStops[i].stop_id;
      let idB = finalStops[i + 1].stop_id;

      if (idA > idB) {
        [idA, idB] = [idB, idA];
      }

      await connection.execute(
        `
        INSERT IGNORE INTO connection
        (ownerA_type, ownerA_id, ownerB_type, ownerB_id, connection_type, status)
        VALUES ('STOP', ?, 'STOP', ?, 'VERTICAL', 'AVAILABLE')
        `,
        [idA, idB]
      );
    }

    await connection.commit();

    // -------------------------------------------------
    // 8) Building-level hanging floor warning
    // -------------------------------------------------
    const [unservedFloors] = await db.execute(
      `
      SELECT f.floor_number
      FROM floor f
      LEFT JOIN transport_stop ts ON ts.floor_id = f.floor_id
      LEFT JOIN transport_shaft sh ON sh.shaft_id = ts.shaft_id
      WHERE f.building_id = ?
      GROUP BY f.floor_id
      HAVING COUNT(ts.stop_id) = 0
      ORDER BY f.floor_number
      `,
      [buildingId]
    );

    const warning =
      unservedFloors.length > 0
        ? `Floors not served by any transport: ${unservedFloors
            .map(f => f.floor_number)
            .join(", ")}`
        : null;

    return res.status(201).json({
      message: "Stops inserted successfully",
      warning
    });

  } catch (err) {
    await connection.rollback();
    return res.status(400).json({ error: err.message });
  } finally {
    connection.release();
  }
});

module.exports = router;