const express = require("express");
const router = express.Router();

// POST /hallways
router.post("/", async (req, res) => {
  const db = req.app.locals.db;
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const { status } = req.body;

    // ---------------------------------------------
    // 1) Validate status
    // ---------------------------------------------
    if (!["AVAILABLE", "UNAVAILABLE"].includes(status)) {
      return res.status(400).json({
        error: "status must be 'AVAILABLE' or 'UNAVAILABLE'"
      });
    }

    // ---------------------------------------------
    // 2) Insert hallway with temporary empty name
    // ---------------------------------------------
    const [result] = await connection.execute(
      `INSERT INTO hallway (hallway_name, status) VALUES ('', ?)`,
      [status]
    );

    const hallwayId = result.insertId;
    const hallwayName = `Hallway ${hallwayId}`;

    // ---------------------------------------------
    // 3) Update hallway name
    // ---------------------------------------------
    await connection.execute(
      `UPDATE hallway SET hallway_name = ? WHERE hallway_ID = ?`,
      [hallwayName, hallwayId]
    );

    await connection.commit();

    return res.status(201).json({
      message: "Hallway inserted successfully",
      hallway: {
        hallway_ID: hallwayId,
        hallway_name: hallwayName,
        status
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