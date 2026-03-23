const express = require('express');
const mysql = require('mysql2/promise'); // << use promise version
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// middleware to parse JSON
app.use(express.json());

// ---------------------------
// Database Setup
// ---------------------------
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// make db accessible to routers via app.locals
app.locals.db = db;

// ---------------------------
// Basic Test Route
// ---------------------------
app.get('/', (req, res) => {
  res.send('Hello Railway');
});

// ---------------------------
// Scheduling / Event Routes
// ---------------------------
app.use('/scheduling/events/attributes', require('./routes/schedule_retrieval/event_attribute'));
app.use('/scheduling/events/location', require('./routes/schedule_retrieval/event_location'));
app.use('/scheduling/events/users', require('./routes/schedule_retrieval/event_userID'));

// ---------------------------
// Insert Campus Diagram Routes
// ---------------------------
// all routes mounted under /api/insert
const insertRoutes = [
  '01_insert_campus',
  '02_insert_building',
  '03_insert_elevator',
  '04_insert_floor',
  '05_insert_room',
  '06_insert_hallway',
  '07_insert_elevatorstop',
  '08_insert_zone',
  '09_insert_roomzone_association',
  '10_insert_connection'
];

insertRoutes.forEach(file => {
  app.use('/api/insert', require(`./routes/insert_campusDiagram/${file}`));
});

// ---------------------------
// Drop Campus Diagram Routes
// ---------------------------
app.use('/api/drop', require('./routes/drop_campusDiagram/drop_connection'));
app.use('/api/drop', require('./routes/drop_campusDiagram/drop_entity'));

// ---------------------------
// Status Routes
// ---------------------------
app.use('/api/status', require('./routes/status/get_status'));
app.use('/api/status', require('./routes/status/update_status'));

// ---------------------------
// Start Server
// ---------------------------
app.listen(port, () => console.log(`Server running on port ${port}`));