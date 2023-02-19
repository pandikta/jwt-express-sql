const { DataTypes, QueryTypes } = require('sequelize')
const dbSequilize = require('../config/database');

const Category = dbSequilize.define(
    'category',
    {
        uuid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
)


module.exports = {
    Category
}