const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");

const app = express();

console.log('Express Started');

db.sequelize.sync();

// Opciones CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL
}

// Allow Cors
app.use(cors()); // Pass here corsOptions if required (production)

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// App Port
const port = process.env.PORT || 4000;

// Routes
app.use('/api/items', require('./routes/items'));
app.use('/api/auth', require('./routes/auth'));


// Start App
app.listen(port, '0.0.0.0', () => {
    console.log(`Server working on ${port}`);
});