const express = require("express");
const router = express.Router();

// POST /transport-shafts
router.post("/", async (req, res) => {
  const db = req.app.locals.db;
  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    const { building_id, transport_type } = req.body;

    // 1) Validate transport type
    if (!["ELEVATOR", "STAIR"].includes(transport_type)) {
      return res.status(400).json({ error: "transport_type must be 'ELEVATOR' or 'STAIR'" });
    }

    // 2) Validate building exists
    const [buildingRows] = await connection.execute(
      `SELECT building_id FROM building WHERE building_id = ?`,
      [building_id]
    );

    if (buildingRows.length === 0) {
      return res.status(404).json({ error: "Building not found" });
    }

    // 3) Insert new transport shaft (name auto-generated later)
    const [result] = await connection.execute(
      `INSERT INTO transport_shaft (building_id, transport_type, name) VALUES (?, ?, '')`,
      [building_id, transport_type]
    );

    const shaftId = result.insertId;
    const name = `${transport_type} ${shaftId}`;

    // Update the shaft with its generated name
    await connection.execute(
      `UPDATE transport_shaft SET name = ? WHERE shaft_id = ?`,
      [name, shaftId]
    );

    await connection.commit();

    return res.status(201).json({
      message: "Transport shaft inserted successfully",
      shaft: { shaft_id: shaftId, building_id, transport_type, name },
    });

  } catch (err) {
    await connection.rollback();
    return res.status(400).json({ error: err.message });
  } finally {
    connection.release();
  }
});

module.exports = router;