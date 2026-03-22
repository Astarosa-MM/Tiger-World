const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// middleware to parse JSON
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// make db accessible to routers via app.locals
app.locals.db = db;

// basic test route
app.get('/', (req, res) => {
    res.send('Hello Railway');
});

// ---------------------------
// Scheduling / Event Routes
// ---------------------------
const eventAttributeRoutes = require('./routes/schedule_retrieval/event_attribute');
const eventLocationRoutes = require('./routes/schedule_retrieval/event_location');
const eventUserIDRoutes = require('./routes/schedule_retrieval/event_userID');

app.use('/scheduling/events/attributes', eventAttributeRoutes);
app.use('/scheduling/events/location', eventLocationRoutes);
app.use('/scheduling/events/users', eventUserIDRoutes);

// ---------------------------
// Insert Campus Diagram Routes
// ---------------------------
app.use('/api/insert', require('./routes/insert_campusDiagram/01_insert_campus'));
app.use('/api/insert', require('./routes/insert_campusDiagram/02_insert_building'));
app.use('/api/insert', require('./routes/insert_campusDiagram/03_insert_elevator'));
app.use('/api/insert', require('./routes/insert_campusDiagram/04_insert_floor'));
app.use('/api/insert', require('./routes/insert_campusDiagram/05_insert_room'));
app.use('/api/insert', require('./routes/insert_campusDiagram/06_insert_hallway'));
app.use('/api/insert', require('./routes/insert_campusDiagram/07_insert_elevatorstop'));
app.use('/api/insert', require('./routes/insert_campusDiagram/08_insert_zone'));
app.use('/api/insert', require('./routes/insert_campusDiagram/09_insert_roomzone_association'));
app.use('/api/insert', require('./routes/insert_campusDiagram/10_insert_connection'));

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