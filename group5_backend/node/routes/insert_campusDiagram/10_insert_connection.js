const express = require("express");
const router = express.Router();

const NODE_TYPES = ["ROOM", "HALLWAY", "STOP", "CAMPUS"];

const NODE_META = {
  ROOM: { table: "room", idColumn: "room_ID" },
  HALLWAY: { table: "hallway", idColumn: "hallway_ID" },
  STOP: { table: "transport_stop", idColumn: "stop_id" },
  CAMPUS: { table: "campus", idColumn: "campus_ID" }
};

// POST /connections
router.post("/", async (req, res) => {
  const db = req.app.locals.db;
  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    let { ownerA_type, ownerA_id, ownerB_type, ownerB_id } = req.body;

    // ---------------------------------------------
    // 1) Validate type + IDs
    // ---------------------------------------------
    if (!NODE_TYPES.includes(ownerA_type) || !NODE_TYPES.includes(ownerB_type)) {
      return res.status(400).json({ error: "Invalid node type" });
    }

    ownerA_id = Number(ownerA_id);
    ownerB_id = Number(ownerB_id);

    if (!Number.isInteger(ownerA_id) || !Number.isInteger(ownerB_id)) {
      return res.status(400).json({ error: "Node IDs must be integers" });
    }

    // ---------------------------------------------
    // 2) Canonical ordering
    // ---------------------------------------------
    if (
      ownerA_type > ownerB_type ||
      (ownerA_type === ownerB_type && ownerA_id > ownerB_id)
    ) {
      [ownerA_type, ownerB_type] = [ownerB_type, ownerA_type];
      [ownerA_id, ownerB_id] = [ownerB_id, ownerA_id];
    }

    // ---------------------------------------------
    // 3) Validate existence
    // ---------------------------------------------
    const validateNodeExists = async (type, id) => {
      const { table, idColumn } = NODE_META[type];

      const [rows] = await connection.execute(
        `SELECT 1 FROM ${table} WHERE ${idColumn} = ?`,
        [id]
      );

      if (rows.length === 0) {
        throw new Error(`${type} with ID ${id} does not exist`);
      }
    };

    await validateNodeExists(ownerA_type, ownerA_id);
    await validateNodeExists(ownerB_type, ownerB_id);

    // ---------------------------------------------
    // 4) Fetch hierarchy context
    // ---------------------------------------------
    const getNodeContext = async (type, id) => {
      switch (type) {

        case "ROOM":
          const [room] = await connection.execute(`
            SELECT r.floor_ID, f.building_ID, b.campus_ID
            FROM room r
            JOIN floor f ON r.floor_ID = f.floor_ID
            JOIN building b ON f.building_ID = b.building_ID
            WHERE r.room_ID = ?
          `, [id]);
          return { ...room[0], shaft_ID: null };

        case "HALLWAY":
          const [hallway] = await connection.execute(`
            SELECT h.floor_ID, f.building_ID, b.campus_ID
            FROM hallway h
            JOIN floor f ON h.floor_ID = f.floor_ID
            JOIN building b ON f.building_ID = b.building_ID
            WHERE h.hallway_ID = ?
          `, [id]);
          return { ...hallway[0], shaft_ID: null };

        case "STOP":
          const [stop] = await connection.execute(`
            SELECT s.floor_ID, s.shaft_ID, f.building_ID, b.campus_ID
            FROM transport_stop s
            JOIN floor f ON s.floor_ID = f.floor_ID
            JOIN building b ON f.building_ID = b.building_ID
            WHERE s.stop_id = ?
          `, [id]);
          return stop[0];

        case "CAMPUS":
          return { campus_ID: id };
      }
    };

    const A = await getNodeContext(ownerA_type, ownerA_id);
    const B = await getNodeContext(ownerB_type, ownerB_id);

    // ---------------------------------------------
    // 5) Enforce connection matrix rules
    // ---------------------------------------------

    // STOP ↔ CAMPUS disallowed
    if (
      (ownerA_type === "STOP" && ownerB_type === "CAMPUS") ||
      (ownerA_type === "CAMPUS" && ownerB_type === "STOP")
    ) {
      throw new Error("STOP cannot connect directly to CAMPUS");
    }

    // CAMPUS ↔ CAMPUS disallowed
    if (ownerA_type === "CAMPUS" && ownerB_type === "CAMPUS") {
      throw new Error("CAMPUS cannot connect to CAMPUS");
    }

    // STOP ↔ STOP must be same shaft
    if (ownerA_type === "STOP" && ownerB_type === "STOP") {
      if (A.shaft_ID !== B.shaft_ID) {
        throw new Error("Stops must belong to the same transport shaft");
      }
    }

    // ROOM ↔ ROOM must be same floor
    if (ownerA_type === "ROOM" && ownerB_type === "ROOM") {
      if (A.floor_ID !== B.floor_ID) {
        throw new Error("Rooms must be on the same floor");
      }
    }

    // ROOM ↔ HALLWAY must be same floor
    if (
      (ownerA_type === "ROOM" && ownerB_type === "HALLWAY") ||
      (ownerA_type === "HALLWAY" && ownerB_type === "ROOM")
    ) {
      if (A.floor_ID !== B.floor_ID) {
        throw new Error("Room and hallway must be on same floor");
      }
    }

    // ROOM ↔ STOP must be same floor
    if (
      (ownerA_type === "ROOM" && ownerB_type === "STOP") ||
      (ownerA_type === "STOP" && ownerB_type === "ROOM")
    ) {
      if (A.floor_ID !== B.floor_ID) {
        throw new Error("Room and stop must be on same floor");
      }
    }

    // HALLWAY ↔ STOP must be same floor
    if (
      (ownerA_type === "HALLWAY" && ownerB_type === "STOP") ||
      (ownerA_type === "STOP" && ownerB_type === "HALLWAY")
    ) {
      if (A.floor_ID !== B.floor_ID) {
        throw new Error("Hallway and stop must be on same floor");
      }
    }

    // HALLWAY ↔ HALLWAY must be same floor
    if (ownerA_type === "HALLWAY" && ownerB_type === "HALLWAY") {
      if (A.floor_ID !== B.floor_ID) {
        throw new Error("Hallways must be on same floor");
      }
    }

    // Any non-campus connection must share campus
    if (
      ownerA_type !== "CAMPUS" &&
      ownerB_type !== "CAMPUS"
    ) {
      if (A.campus_ID !== B.campus_ID) {
        throw new Error("Nodes must belong to the same campus");
      }
    }

    // ---------------------------------------------
    // 6) Insert connection
    // ---------------------------------------------
    await connection.execute(
      `
      INSERT INTO connection
      (ownerA_type, ownerA_id, ownerB_type, ownerB_id)
      VALUES (?, ?, ?, ?)
      `,
      [ownerA_type, ownerA_id, ownerB_type, ownerB_id]
    );

    await connection.commit();

    return res.status(201).json({
      message: "Connection inserted successfully",
      connection: { ownerA_type, ownerA_id, ownerB_type, ownerB_id }
    });

  } catch (err) {
    await connection.rollback();

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "Connection already exists" });
    }

    return res.status(400).json({ error: err.message });
  } finally {
    connection.release();
  }
});

module.exports = router;