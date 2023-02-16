const { Sequelize } = require('sequelize')
var db = new Sequelize('express_sql', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});


module.exports = db