// CHATGBT assisted

const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

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

// import routers
const geometryRoutes = require('./routes/placeholder');
const userEventsRoutes = require('./routes/user_schedule');
const infraScheduleRoutes = require('./routes/infra_schedule');
const eventScheduleRoutes = require('./routes/event_schedule');

// mount routers
app.use('/infrastructure/geometry', geometryRoutes);
app.use('/scheduling/user', userEventsRoutes);
app.use('/scheduling/infrastructure', infraScheduleRoutes);
app.use('/scheduling/events', eventScheduleRoutes);

app.listen(port, () => console.log(`server running on port ${port}`));