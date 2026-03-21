const express = require("express");
const router = express.Router();

// POST /floors/:floorId/rooms
router.post("/floors/:floorId/rooms", async (req, res) => {
  const db = req.app.locals.db;
  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    const floorId = Number(req.params.floorId);
    let { room_number, room_classification, room_status } = req.body;

    // ---------------------------------------------
    // 1) Validate required input
    // ---------------------------------------------
    if (room_number === undefined || isNaN(room_number)) {
      return res.status(400).json({ error: "room_number is required and must be a number" });
    }
    room_number = Number(room_number);

    const allowedClassifications = ["CLASSROOM", "FOOD", "RESTROOM", "LAB"];
    if (!allowedClassifications.includes(room_classification)) {
      return res.status(400).json({
        error: `room_classification must be one of ${allowedClassifications.join(", ")}`
      });
    }

    if (!["AVAILABLE", "UNAVAILABLE"].includes(room_status)) {
      return res.status(400).json({
        error: "room_status must be 'AVAILABLE' or 'UNAVAILABLE'"
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
    // 3) Insert room
    // ---------------------------------------------
    const [result] = await connection.execute(
      `INSERT INTO room (floor_ID, room_number, room_classification, room_status)
       VALUES (?, ?, ?, ?)`,
      [floorId, room_number, room_classification, room_status]
    );

    await connection.commit();

    return res.status(201).json({
      message: "Room inserted successfully",
      room: {
        room_ID: result.insertId,
        floor_ID: floorId,
        room_number,
        room_classification,
        room_status
      }
    });

  } catch (err) {
    await connection.rollback();

    // Handle duplicate (floor_ID, room_number)
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        error: "Room number already exists on this floor"
      });
    }

    return res.status(400).json({ error: err.message });
  } finally {
    connection.release();
  }
});

module.exports = router;