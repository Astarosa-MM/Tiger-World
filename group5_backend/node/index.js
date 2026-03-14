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

// routes
app.get('/', (req, res) => {
    res.send('Hello Railway');
});

//geometry routes
const geometryRoutes = require('./routes/placeholder');
app.use('/infrastructure/geometry', geometryRoutes);

// user schedule
const userEventsRoutes = require('./routes/placeholder2');
app.use('/scheduling/user', userEventsRoutes);

app.listen(port, () => console.log(`server running on port ${port}`));