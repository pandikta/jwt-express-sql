const dbPool = require("../config/database")

const getAllUsers = () => {
    const sql = "SELECT*FROM USERS"

    return dbPool.execute(sql)
}

const createNewUser = (body) => {
    const sql = `INSERT INTO USERS (NAME,EMAIL,ADDRESS) VALUES ('${body.name}','${body.email}','${body.address}')`

    return dbPool.execute(sql)
}

const checkUser = (id) => {
    const sql = `SELECT ID FROM USERS WHERE ID = '${id}'`

    return dbPool.execute(sql)
}

const updateUser = (body, id) => {
    const sql = `UPDATE USERS SET NAME='${body.name}',EMAIL='${body.email}',ADDRESS='${body.address}' WHERE  ID = ${id}`

    return dbPool.execute(sql)
}

const deleteUser = (id) => {
    const sql = `DELETE FROM USERS WHERE ID = ${id}`

    return dbPool.execute(sql)
}
module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    checkUser,
    deleteUser
}