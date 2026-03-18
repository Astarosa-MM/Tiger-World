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
const eventAttributeRoutes = require('./routes/schedule_retrieval/event_attribute');
const eventLocationRoutes = require('./routes/schedule_retrieval/event_location');
const eventUserIDRoutes = require('./routes/schedule_retrieval/event_userID');

// mount routers
app.use('/scheduling/events/attributes', eventAttributeRoutes);
app.use('/scheduling/events/location', eventLocationRoutes);
app.use('/scheduling/events/users', eventUserIDRoutes);

app.listen(port, () => console.log(`server running on port ${port}`));
