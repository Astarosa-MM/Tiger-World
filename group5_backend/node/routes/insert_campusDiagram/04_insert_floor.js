const express = require("express");
const router = express.Router();

// POST /buildings/:buildingId/floors
router.post("/buildings/:buildingId/floors", async (req, res) => {
  const db = req.app.locals.db;
  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    const buildingId = Number(req.params.buildingId);
    let { floor_number, floor_status } = req.body;

    // ---------------------------------------------
    // 1) Validate required input
    // ---------------------------------------------
    if (floor_number === undefined || isNaN(floor_number)) {
      return res.status(400).json({ error: "floor_number is required and must be a number" });
    }

    floor_number = Number(floor_number); // ensure numeric

    if (!["AVAILABLE", "UNAVAILABLE"].includes(floor_status)) {
      return res.status(400).json({
        error: "floor_status must be 'AVAILABLE' or 'UNAVAILABLE'"
      });
    }

    // ---------------------------------------------
    // 2) Get building name (FK ensures existence,
    //    but we need name to generate floor name)
    // ---------------------------------------------
    const [buildingRows] = await connection.execute(
      `SELECT building_name FROM building WHERE building_ID = ?`,
      [buildingId]
    );

    if (buildingRows.length === 0) {
      return res.status(404).json({ error: "Building not found" });
    }

    const buildingName = buildingRows[0].building_name.trim();
    const floorName = `${buildingName} - Floor ${floor_number}`;

    // ---------------------------------------------
    // 3) Insert floor
    // ---------------------------------------------
    const [result] = await connection.execute(
      `INSERT INTO floor (building_ID, floor_number, name, floor_status)
       VALUES (?, ?, ?, ?)`,
      [buildingId, floor_number, floorName, floor_status]
    );

    await connection.commit();

    return res.status(201).json({
      message: "Floor inserted successfully",
      floor: {
        floor_ID: result.insertId,
        building_ID: buildingId,
        floor_number,
        name: floorName,
        floor_status
      }
    });

  } catch (err) {
    await connection.rollback();

    // Handle duplicate (building_ID, floor_number)
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        error: "Floor number already exists for this building"
      });
    }

    return res.status(400).json({ error: err.message });
  } finally {
    connection.release();
  }
});

module.exports = router;