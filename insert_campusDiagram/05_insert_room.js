import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  const db = req.app.locals.db;
  const { building_id } = req.query;

  if (!building_id) {
    return res.status(400).json({ error: "building_id required" });
  }

  try {
    const [rows] = await db.execute(
      `
      SELECT *
      FROM room
      WHERE building_ID = ?
      `,
      [building_id]
    );

    res.json({ rooms: rows || [] });

  } catch (err) {
    console.error("ROOMS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/insert/room
router.post("/", async (req, res) => {
  const db = req.app.locals.db;

  try {
    let {
      building_ID,
      room_number,
      room_classification,
      occupant,
      department,
      restroom_type
    } = req.body;

    if (!building_ID || !room_number) {
      return res.status(400).json({
        error: "building_ID and room_number required"
      });
    }

    const allowed = [
      "CLASSROOM",
      "FOOD",
      "RESTROOM",
      "LABORATORY",
      "OFFICE",
      "OTHER"
    ];

    if (room_classification && !allowed.includes(room_classification)) {
      return res.status(400).json({
        error: "Invalid room_classification"
      });
    }

await db.execute(
  `INSERT INTO room 
  (building_ID, room_number, room_classification, room_status, occupant, department, restroom_type)
  VALUES (?, ?, ?, ?, ?, ?, ?)`,
  [
    building_ID,
    room_number,
    room_classification || "CLASSROOM",
    "AVAILABLE",
    occupant ?? null,
    department ?? null,
    restroom_type ?? null
  ]
);

    res.status(201).json({ message: "Room created" });

  } catch (err) {
    console.error("INSERT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;