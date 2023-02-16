const userModel = require('../models/users')

const getAllUsers = async (req, res) => {
    try {

        const [data] = await userModel.getAllUsers()
        res.json({
            msg: "Get all users success",
            data: data,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Server error",
            serverMessage: error
        })
    }

}

const createNewUser = (req, res) => {
    res.json({
        msg: "Create new user success",
        data: req.body
    })
}

const updateUser = (req, res) => {
    const { id } = req.params
    res.json({
        msg: "Update user success",
        data: req.body
    })
}

const deleteUser = (req, res) => {
    const { id } = req.params
    res.json({
        msg: "Delete user success",
        data: {
            id: id,
            name: "dikta delete",
            email: "delet email"
        }
    })
}

module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}