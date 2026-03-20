const express = require('express');
const router = express.Router();

/**
 * POST /vertical_stops
 * Body parameters:
 *   type: 'STAIR' | 'ELEVATOR'        - required
 *   building_ID: integer              - required
 *   stop_floors: [integer]            - required, e.g., [1,2,3]
 */
router.post('/', async (req, res) => {
  const db = req.app.locals.db;
  const { type, building_ID, stop_floors } = req.body;

  if (!['STAIR', 'ELEVATOR'].includes(type)) {
    return res.status(400).json({ error: 'Invalid type, must be STAIR or ELEVATOR' });
  }
  if (!building_ID || !Array.isArray(stop_floors) || stop_floors.length === 0) {
    return res.status(400).json({ error: 'building_ID and stop_floors are required' });
  }

  try {
    // 1. Fetch building floors
    const [floors] = await db.promise().query(
      'SELECT floor_number, floor_ID FROM floor WHERE building_ID = ? ORDER BY floor_number ASC',
      [building_ID]
    );
    if (floors.length === 0) {
      return res.status(400).json({ error: 'Building has no floors' });
    }

    const floorNumbers = floors.map(f => f.floor_number);

    // 2. Validate stop_floors exist and are continuous
    stop_floors.sort((a,b) => a-b);
    for (let i = 0; i < stop_floors.length; i++) {
      if (!floorNumbers.includes(stop_floors[i])) {
        return res.status(400).json({ error: `Floor ${stop_floors[i]} does not exist in building` });
      }
      if (i > 0 && stop_floors[i] !== stop_floors[i-1] + 1) {
        return res.status(400).json({ error: 'Cannot skip floors' });
      }
    }

    // 3. Insert vertical_connector (parent) first
    const [parentResult] = await db.promise().query(
      'INSERT INTO vertical_connector (type, building_ID) VALUES (?, ?)',
      [type, building_ID]
    );
    const connector_ID = parentResult.insertId;

    // 4. Insert stops
    const stopValues = stop_floors.map(floorNum => {
      const floor_ID = floors.find(f => f.floor_number === floorNum).floor_ID;
      return [connector_ID, floor_ID];
    });

    // prevent duplicate stops on same floor
    await db.promise().query(
      'INSERT INTO vertical_stop (connector_ID, floor_ID) VALUES ?',
      [stopValues]
    );

    res.json({ success: true, connector_ID, stop_floors });
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Stop already exists on one of the floors' });
    }
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;