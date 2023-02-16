const dbPool = require("../config/database")

const getAllUsers = () => {
    const sql = "SELECT*FROM USERS"

    return dbPool.execute(sql)
}

module.exports = {
    getAllUsers
}