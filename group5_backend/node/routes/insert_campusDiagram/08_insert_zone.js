const express = require("express");
const router = express.Router();

// POST /floors/:floorId/zones
router.post("/floors/:floorId/zones", async (req, res) => {
  const db = req.app.locals.db;
  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    const floorId = Number(req.params.floorId);
    let { zone_number, name, zone_status } = req.body;

    // ---------------------------------------------
    // 1) Validate input
    // ---------------------------------------------
    if (zone_number === undefined || isNaN(zone_number)) {
      return res.status(400).json({ error: "zone_number is required and must be a number" });
    }
    zone_number = Number(zone_number);

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "name is required" });
    }
    name = name.trim();

    if (!["AVAILABLE", "UNAVAILABLE"].includes(zone_status)) {
      return res.status(400).json({
        error: "zone_status must be 'AVAILABLE' or 'UNAVAILABLE'"
      });
    }

    // ---------------------------------------------
    // 2) Validate floor exists
    // ---------------------------------------------
    const [floorRows] = await connection.execute(
      `SELECT floor_ID FROM floor WHERE floor_ID = ?`,
      [floorId]
    );

    if (floorRows.length === 0) {
      return res.status(404).json({ error: "Floor not found" });
    }

    // ---------------------------------------------
    // 3) Insert zone
    // ---------------------------------------------
    const [result] = await connection.execute(
      `INSERT INTO zone (floor_ID, zone_number, name, zone_status)
       VALUES (?, ?, ?, ?)`,
      [floorId, zone_number, name, zone_status]
    );

    await connection.commit();

    return res.status(201).json({
      message: "Zone inserted successfully",
      zone: {
        zone_ID: result.insertId,
        floor_ID: floorId,
        zone_number,
        name,
        zone_status
      }
    });

  } catch (err) {
    await connection.rollback();

    // Handle duplicate (floor_ID, zone_number)
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        error: "Zone number already exists on this floor"
      });
    }

    return res.status(400).json({ error: err.message });
  } finally {
    connection.release();
  }
});

module.exports = router;