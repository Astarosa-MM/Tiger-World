const express = require("express");
const router = express.Router();

// POST /campuses/:campusId/buildings
router.post("/campuses/:campusId/buildings", async (req, res) => {
  const db = req.app.locals.db;
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const campusId = Number(req.params.campusId);
    const { building_name, building_status } = req.body;

    // ---------------------------------------------
    // 1) Validate input
    // ---------------------------------------------
    if (!building_name || building_name.trim() === "") {
      return res.status(400).json({ error: "building_name is required" });
    }

    if (!["AVAILABLE", "UNAVAILABLE"].includes(building_status)) {
      return res.status(400).json({
        error: "building_status must be 'AVAILABLE' or 'UNAVAILABLE'"
      });
    }

    // ---------------------------------------------
    // 2) Validate campus exists
    // ---------------------------------------------
    const [campusRows] = await connection.execute(
      `SELECT campus_ID FROM campus WHERE campus_ID = ?`,
      [campusId]
    );

    if (campusRows.length === 0) {
      return res.status(404).json({ error: "Campus not found" });
    }

    // ---------------------------------------------
    // 3) Insert building
    // ---------------------------------------------
    const [result] = await connection.execute(
      `INSERT INTO building (campus_ID, building_name, building_status)
       VALUES (?, ?, ?)`,
      [campusId, building_name.trim(), building_status]
    );

    await connection.commit();

    return res.status(201).json({
      message: "Building inserted successfully",
      building: {
        building_ID: result.insertId,
        campus_ID: campusId,
        building_name: building_name.trim(),
        building_status
      }
    });
  } catch (err) {
    await connection.rollback();
    return res.status(400).json({ error: err.message });
  } finally {
    connection.release();
  }
});

module.exports = router;