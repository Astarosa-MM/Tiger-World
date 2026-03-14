const express = require('express');
const router = express.Router();
const db = req.app.locals.db;

/**
 * GET /infrastructure/geometry
 * Query parameters:
 *    vertex_owner_type (string)        - required
 *    vertex_owner_ID   (integer)       - optional, requires type
 *    include_children  (boolean)       - optional, default false
 *
 * Returns edges as pairs of vertex coordinates:
 *    [{ vertexA: {x, y}, vertexB: {x, y} }, ...]
 *
 * Cases supported:
 *    1. Type only → all entities of this type (optionally include children types)
 *    2. Type + ID → specific entity (optionally include children)
 */
router.get('/', (req, res) => {
    const { vertex_owner_type, vertex_owner_ID, include_children } = req.query;

    // integrity checks
    if (!vertex_owner_type) {
        return res.status(400).json({ error: 'vertex_owner_type is required' });
    }
    if (vertex_owner_ID && !vertex_owner_type) {
        return res.status(400).json({ error: 'vertex_owner_ID requires vertex_owner_type' });
    }

    // Build list of owner conditions
    let ownerQuery = '';
    const ownerParams = [];

    if (vertex_owner_ID) {
        // specific entity
        ownerQuery = 'vertex_owner_type = ? AND vertex_owner_ID = ?';
        ownerParams.push(vertex_owner_type, vertex_owner_ID);
    } else {
        // type-only
        ownerQuery = 'vertex_owner_type = ?';
        ownerParams.push(vertex_owner_type);
    }

    // include_children logic
    if (include_children === 'true') {
        switch (vertex_owner_type.toUpperCase()) {
            case 'BUILDING':
                ownerQuery += `
                OR (vertex_owner_type = 'FLOOR' AND vertex_owner_ID IN (SELECT floor_ID FROM floor WHERE building_ID ${vertex_owner_ID ? '= ?' : 'IS NOT NULL'}))
                OR (vertex_owner_type = 'ZONE' AND vertex_owner_ID IN (SELECT zone_ID FROM zone WHERE floor_ID IN (SELECT floor_ID FROM floor WHERE building_ID ${vertex_owner_ID ? '= ?' : 'IS NOT NULL'})))
                OR (vertex_owner_type = 'ROOM' AND vertex_owner_ID IN (SELECT room_ID FROM room WHERE floor_ID IN (SELECT floor_ID FROM floor WHERE building_ID ${vertex_owner_ID ? '= ?' : 'IS NOT NULL'})))`;
                if (vertex_owner_ID) ownerParams.push(vertex_owner_ID, vertex_owner_ID, vertex_owner_ID);
                break;
            case 'FLOOR':
                ownerQuery += `
                OR (vertex_owner_type = 'ZONE' AND vertex_owner_ID IN (SELECT zone_ID FROM zone WHERE floor_ID ${vertex_owner_ID ? '= ?' : 'IS NOT NULL'}))
                OR (vertex_owner_type = 'ROOM' AND vertex_owner_ID IN (SELECT room_ID FROM room WHERE floor_ID ${vertex_owner_ID ? '= ?' : 'IS NOT NULL'}))`;
                if (vertex_owner_ID) ownerParams.push(vertex_owner_ID, vertex_owner_ID);
                break;
            case 'ZONE':
                ownerQuery += `
                OR (vertex_owner_type = 'ROOM' AND vertex_owner_ID IN (SELECT room_ID FROM room_to_zone WHERE zone_ID ${vertex_owner_ID ? '= ?' : 'IS NOT NULL'}))`;
                if (vertex_owner_ID) ownerParams.push(vertex_owner_ID);
                break;
            // ROOM has no children
        }
    }

    // Step 1: get all relevant vertex IDs
    const vertexQuery = `
        SELECT vertex_ID, x_coordinate, y_coordinate
        FROM vertices
        WHERE ${ownerQuery}
    `;

    db.query(vertexQuery, ownerParams, (err, vertices) => {
        if (err) return res.status(500).json({ error: err });
        if (!vertices.length) return res.json({ edges: [] });

        const vertexMap = {};
        const vertexIds = vertices.map(v => {
            vertexMap[v.vertex_ID] = { x: v.x_coordinate, y: v.y_coordinate };
            return v.vertex_ID;
        });

        // Step 2: get all edges connecting these vertices
        const edgesQuery = `
            SELECT vertex_A_ID, vertex_B_ID
            FROM edges
            WHERE vertex_A_ID IN (?) AND vertex_B_ID IN (?)
        `;

        db.query(edgesQuery, [vertexIds, vertexIds], (err2, edges) => {
            if (err2) return res.status(500).json({ error: err2 });

            const result = edges.map(e => ({
                vertexA: vertexMap[e.vertex_A_ID],
                vertexB: vertexMap[e.vertex_B_ID]
            }));

            return res.json({ edges: result });
        });
    });
});

module.exports = router;
