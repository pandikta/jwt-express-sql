const express = require('express')
const UserController = require('../controller/users.js')
const router = express.Router()
// READ
router.get('/', UserController.getAllUsers)
//CREATE
router.post('/', UserController.createNewUser)
// UPDATE
router.patch('/:id', UserController.updateUser)
// DELETE
router.delete('/:id', UserController.deleteUser)


module.exports = router