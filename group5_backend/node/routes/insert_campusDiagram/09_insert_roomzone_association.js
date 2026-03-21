const express = require("express");
const router = express.Router();

// POST /zones/:zoneId/rooms
router.post("/zones/:zoneId/rooms", async (req, res) => {
  const db = req.app.locals.db;
  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    const zoneId = Number(req.params.zoneId);
    const { room_ids } = req.body;

    // ---------------------------------------------
    // 1) Validate input
    // ---------------------------------------------
    if (!Array.isArray(room_ids) || room_ids.length === 0) {
      return res.status(400).json({ error: "room_ids must be a non-empty array" });
    }

    // ---------------------------------------------
    // 2) Validate zone exists
    // ---------------------------------------------
    const [zoneRows] = await connection.execute(
      `SELECT floor_ID FROM zone WHERE zone_ID = ?`,
      [zoneId]
    );
    if (zoneRows.length === 0) {
      return res.status(404).json({ error: "Zone not found" });
    }
    const zoneFloorId = zoneRows[0].floor_ID;

    // ---------------------------------------------
    // 3) Validate rooms exist and belong to same floor
    // ---------------------------------------------
    const placeholders = room_ids.map(() => "?").join(",");
    const [roomRows] = await connection.execute(
      `
      SELECT room_ID
      FROM room
      WHERE room_ID IN (${placeholders})
        AND floor_ID = ?
      `,
      [...room_ids, zoneFloorId]
    );

    if (roomRows.length !== room_ids.length) {
      return res.status(400).json({
        error: "One or more rooms do not exist or are not on the same floor as the zone"
      });
    }

    // ---------------------------------------------
    // 4) Insert zone-room mappings
    // ---------------------------------------------
    for (const room of roomRows) {
      await connection.execute(
        `INSERT IGNORE INTO zone_room (zone_ID, room_ID) VALUES (?, ?)`,
        [zoneId, room.room_ID]
      );
    }

    await connection.commit();

    return res.status(201).json({
      message: "Rooms assigned to zone successfully",
      zone_ID: zoneId,
      room_ids: roomRows.map(r => r.room_ID)
    });

  } catch (err) {
    await connection.rollback();
    return res.status(400).json({ error: err.message });
  } finally {
    connection.release();
  }
});

module.exports = router;