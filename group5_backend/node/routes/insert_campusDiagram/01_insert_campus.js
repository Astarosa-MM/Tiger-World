const express = require("express");
const router = express.Router();

// POST /campuses
router.post("/", async (req, res) => {
  const db = req.app.locals.db;
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const { campus_name, campus_status } = req.body;

    // ---------------------------------------------
    // 1) Validate input
    // ---------------------------------------------
    if (!campus_name || campus_name.trim() === "") {
      return res.status(400).json({ error: "campus_name is required" });
    }

    if (!["AVAILABLE", "UNAVAILABLE"].includes(campus_status)) {
      return res.status(400).json({
        error: "campus_status must be 'AVAILABLE' or 'UNAVAILABLE'"
      });
    }

    // ---------------------------------------------
    // 2) Insert campus
    // ---------------------------------------------
    const [result] = await connection.execute(
      `INSERT INTO campus (campus_name, campus_status)
       VALUES (?, ?)`,
      [campus_name.trim(), campus_status]
    );

    await connection.commit();

    return res.status(201).json({
      message: "Campus inserted successfully",
      campus: {
        campus_ID: result.insertId,
        campus_name: campus_name.trim(),
        campus_status
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