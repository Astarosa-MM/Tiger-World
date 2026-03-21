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
      return res.status(400).json({ error: "floor_ids must be a non-empty array" });
    }

    // -------------------------------------------------
    // 1) Validate shaft & get name
    // -------------------------------------------------
    const [shaftRows] = await connection.execute(
      `SELECT building_id, name FROM transport_shaft WHERE shaft_id = ?`,
      [shaftId]
    );

    if (shaftRows.length === 0) {
      return res.status(404).json({ error: "Transport shaft not found" });
    }

    const buildingId = shaftRows[0].building_id;
    const shaftName = shaftRows[0].name.trim();

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
    // 3) Insert requested stops with names
    // -------------------------------------------------
    for (const floor of floorRows) {
      const stopName = `${shaftName} - Floor ${floor.floor_number}`;
      await connection.execute(
        `INSERT INTO transport_stop (shaft_id, floor_id, name)
         VALUES (?, ?, ?)`,
        [shaftId, floor.floor_id, stopName]
      );
    }

    // -------------------------------------------------
    // 4) Fetch all stops for this shaft
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
    // 5) Detect gaps and auto-fill if requested
    // -------------------------------------------------
    let missing = [];
    for (let i = 0; i < floorNumbers.length - 1; i++) {
      if (floorNumbers[i + 1] !== floorNumbers[i] + 1) {
        for (let f = floorNumbers[i] + 1; f < floorNumbers[i + 1]; f++) {
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

      const [rangeFloors] = await connection.execute(
        `
        SELECT floor_id, floor_number
        FROM floor
        WHERE building_id = ?
          AND floor_number BETWEEN ? AND ?
        ORDER BY floor_number
        `,
        [buildingId, floorNumbers[0], floorNumbers[floorNumbers.length - 1]]
      );

      for (const floor of rangeFloors) {
        const stopName = `${shaftName} - Floor ${floor.floor_number}`;
        await connection.execute(
          `INSERT IGNORE INTO transport_stop (shaft_id, floor_id, name)
           VALUES (?, ?, ?)`,
          [shaftId, floor.floor_id, stopName]
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
    // 7) Create vertical connections (polymorphic)
    // -------------------------------------------------
    for (let i = 0; i < finalStops.length - 1; i++) {
      let idA = finalStops[i].stop_id;
      let idB = finalStops[i + 1].stop_id;

      // canonical ordering
      if (idA > idB) [idA, idB] = [idB, idA];

      await connection.execute(
        `
        INSERT IGNORE INTO connection
        (ownerA_type, ownerA_id, ownerB_type, ownerB_id)
        VALUES ('STOP', ?, 'STOP', ?)
        `,
        [idA, idB]
      );
    }

    await connection.commit();

    // -------------------------------------------------
    // 8) Building-level unserved floor warning
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

    return res.status(201).json({ message: "Stops inserted successfully", warning });

  } catch (err) {
    await connection.rollback();
    return res.status(400).json({ error: err.message });
  } finally {
    connection.release();
  }
});

module.exports = router;