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

const createNewUser = async (req, res) => {
    const { body } = req
    try {
        await userModel.createNewUser(body)

        res.json({
            msg: "Create new user success",
            data: body
        })
    } catch (error) {
        res.status(500).json({
            msg: "Server error",
            serverMessage: error
        })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params
    const { body } = req
    try {
        const [userExist] = await userModel.checkUser(id)
        if (userExist.length == 0) {
            return res.status(404).json({
                msg: `Data ${id} not found`
            })
        }
        await userModel.updateUser(body, id)
        res.json({
            msg: "Update user success",
            data: {
                id: id,
                ...body
            }
        })
    } catch (error) {
        res.status(500).json({
            msg: "Server error",
            serverMessage: error
        })
    }

}

const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        const [userExist] = await userModel.checkUser(id)
        if (userExist.length == 0) {
            return res.status(404).json({
                msg: `Data ${id} not found`
            })
        }

        await userModel.deleteUser(id)
        res.json({
            msg: `Delete user ${id} success`
        })
    } catch (error) {
        res.status(500).json({
            msg: "Server error",
            serverMessage: error
        })
    }

}

module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}