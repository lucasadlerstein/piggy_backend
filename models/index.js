const dbCon = require('../config/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbCon.DB, dbCon.USER, dbCon.PASSWORD, {
    host: dbCon.HOST,
    dialect: dbCon.dialect,
    operatorAliases: false,
    pool: {
        max: dbCon.pool.max,
        min: dbCon.pool.min,
        acquire: dbCon.pool.acquire,
        idle: dbCon.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.items = require("./items.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);

module.exports = db;