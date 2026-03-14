// placeholder_filename.js

const express = require('express');
const router = express.Router();
// importing the database connection object from another file
const db = require('../db/connection'); // your MySQL connection

/**
 * GET /infrastructure/geometry
 * Query parameters:
 *    vertex_owner_type (string)
 *    vertex_owner_ID   (integer)
 *
 * Returns all unique, undirected edge pairs where **both vertices belong to the owner**.
 * 
 * Note: edges can be stored in any order in the database (vertex_A_ID, vertex_B_ID)
 *       The response uses LEAST/GREATEST to normalize each pair so the frontend sees
 *       each edge as undirected, regardless of storage order.
 */
router.get('/', (req, res) => {
    const { vertex_owner_type, vertex_owner_ID } = req.query;

    if (!vertex_owner_type || !vertex_owner_ID) {
        return res.status(400).json({ error: 'vertex_owner_type and vertex_owner_ID are required' });
    }

    // 1. Get all vertex IDs for this owner
    const vertexQuery = `
        SELECT vertex_ID
        FROM vertices
        WHERE vertex_owner_type = ? AND vertex_owner_ID = ?
    `;

    db.query(vertexQuery, [vertex_owner_type, vertex_owner_ID], (err, vertices) => {
        if (err) return res.status(500).json({ error: err });

        if (!vertices.length) return res.json({ edges: [] });

        const vertexIds = vertices.map(v => v.vertex_ID);

        // 2. Get all edges where both vertices belong to this owner
        const edgesQuery = `
            SELECT DISTINCT
                   LEAST(vertex_A_ID, vertex_B_ID) AS vertex1,
                   GREATEST(vertex_A_ID, vertex_B_ID) AS vertex2,
                   curvature_value
            FROM edges
            WHERE vertex_A_ID IN (?) AND vertex_B_ID IN (?)
        `;

        db.query(edgesQuery, [vertexIds, vertexIds], (err2, edges) => {
            if (err2) return res.status(500).json({ error: err2 });
            return res.json({ edges });
        });
    });
});

module.exports = router;