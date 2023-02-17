const { DataTypes, QueryTypes } = require('sequelize')

const dbSequilize = require("../config/database")

const Users = dbSequilize.define('users', {
    uuid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    remember_token: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})

const getUserById = async (id) => {
    const sql = `SELECT * FROM USERS WHERE UUID = '${id}'`
    const [results] = await dbSequilize.query(sql, {
        type: QueryTypes.SELECT
    });

    return results
}

Users.removeAttribute('id');

module.exports = {
    Users,
    getUserById
}