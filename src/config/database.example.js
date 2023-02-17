const { Sequelize } = require('sequelize');
var db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        dialect: process.env.DB_CONNECTION,
        host: process.env.DB_HOST,
    }
);

module.exports = db;
