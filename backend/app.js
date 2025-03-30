const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mailRoutes = require('./routes/mailRoutes'); 
const dbConnection = require('./Database/dbconnection');


dotenv.config();
const app = express();
dbConnection();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/mail', mailRoutes);

app.get("/", (req, res) => {
    res.send("Hello from the server");
});

module.exports = app; 