const express = require("express");
const router = express.Router();

const NODE_TYPES = ["ROOM", "HALLWAY", "STOP", "CAMPUS"];

// POST /connections
router.post("/", async (req, res) => {
  const db = req.app.locals.db;
  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    let { ownerA_type, ownerA_id, ownerB_type, ownerB_id } = req.body;

    // -------------------------------------------------
    // 1) Validate input types
    // -------------------------------------------------
    if (!NODE_TYPES.includes(ownerA_type) || !NODE_TYPES.includes(ownerB_type)) {
      return res.status(400).json({ error: "Invalid node type" });
    }

    ownerA_id = Number(ownerA_id);
    ownerB_id = Number(ownerB_id);

    if (!Number.isInteger(ownerA_id) || !Number.isInteger(ownerB_id)) {
      return res.status(400).json({ error: "Node IDs must be integers" });
    }

    // -------------------------------------------------
    // 2) Enforce canonical ordering
    // -------------------------------------------------
    if (
      ownerA_type > ownerB_type ||
      (ownerA_type === ownerB_type && ownerA_id > ownerB_id)
    ) {
      [ownerA_type, ownerB_type] = [ownerB_type, ownerA_type];
      [ownerA_id, ownerB_id] = [ownerB_id, ownerA_id];
    }

    // -------------------------------------------------
    // 3) Validate nodes exist
    // -------------------------------------------------
    const validateNode = async (type, id) => {
      let table;
      switch (type) {
        case "ROOM":
          table = "room";
          break;
        case "HALLWAY":
          table = "hallway";
          break;
        case "STOP":
          table = "transport_stop";
          break;
        case "CAMPUS":
          table = "campus";
          break;
      }
      const [rows] = await connection.execute(
        `SELECT 1 FROM ${table} WHERE ${table}_ID = ?`,
        [id]
      );
      if (rows.length === 0) {
        throw new Error(`${type} with ID ${id} does not exist`);
      }
    };

    await validateNode(ownerA_type, ownerA_id);
    await validateNode(ownerB_type, ownerB_id);

    // -------------------------------------------------
    // 4) Insert connection
    // -------------------------------------------------
    await connection.execute(
      `
      INSERT IGNORE INTO connection
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
    return res.status(400).json({ error: err.message });
  } finally {
    connection.release();
  }
});

module.exports = router;