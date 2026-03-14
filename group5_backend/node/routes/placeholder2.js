// routes/user_events.js

const express = require('express');
const router = express.Router();
const db = require('../db/connection'); // your MySQL connection

/**
 * GET /scheduling/user
 * Query parameters:
 *    user_ID (integer) - required
 *    event_date (YYYY-MM-DD) - required
 *
 * Returns all events for the user on that date with location and timing info.
 */
router.get('/', (req, res) => {
    const { user_ID, event_date } = req.query;

    if (!user_ID || !event_date) {
        return res.status(400).json({ error: 'user_ID and event_date are required' });
    }

    const query = `
        SELECT ie.infra_type,
               ie.infra_ID,
               ie.event_name,
               ie.start_time,
               ie.end_time
        FROM user_events ue
        JOIN infra_events ie ON ue.event_ID = ie.event_ID
        WHERE ue.user_ID = ? AND ie.event_date = ?
        ORDER BY ie.start_time;
    `;

    db.query(query, [user_ID, event_date], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        return res.json({ events: results });
    });
});

module.exports = router;