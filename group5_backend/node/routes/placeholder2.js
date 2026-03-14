// routes/placeholder2.js

const express = require('express');
const router = express.Router();
const db = require('../db/connection');

/**
 * GET /scheduling/user
 * Query parameters:
 *    user_ID (integer) - required
 *    start_date (YYYY-MM-DD) - optional
 *    end_date (YYYY-MM-DD) - optional
 *
 * Returns all events for the user in the given date range.
 * If start_date or end_date is omitted, it adjusts the filter accordingly.
 */
router.get('/', (req, res) => {
    const { user_ID, start_date, end_date } = req.query;

    if (!user_ID) {
        return res.status(400).json({ error: 'user_ID is required' });
    }

    // Base query
    let query = `
        SELECT ie.infra_type,
               ie.infra_ID,
               ie.event_name,
               ie.start_time,
               ie.end_time,
               ie.event_date
        FROM user_events ue
        JOIN infra_events ie ON ue.event_ID = ie.event_ID
        WHERE ue.user_ID = ?
    `;
    const params = [user_ID];

    // Add optional filters
    if (start_date && end_date) {
        query += ' AND ie.event_date BETWEEN ? AND ?';
        params.push(start_date, end_date);
    } else if (start_date) {
        query += ' AND ie.event_date >= ?';
        params.push(start_date);
    } else if (end_date) {
        query += ' AND ie.event_date <= ?';
        params.push(end_date);
    }

    query += ' ORDER BY ie.event_date, ie.start_time';

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        return res.json({ events: results });
    });
});

module.exports = router;