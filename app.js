const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db/db');

// routes
const userRoute = require('./routes/users/users.route');
app.use('/users',userRoute);

// body parser
app.use(bodyParser.json());

// database connection

module.exports = app;