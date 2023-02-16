const express = require('express')
const UserController = require('../controller/users.js')
const router = express.Router()
// READ
router.get('/', UserController.getAllUsers)
// READ BY ID
router.get('/:id', UserController.getUserById)
//CREATE
router.post('/register', UserController.register)
// UPDATE
router.patch('/:id', UserController.updateUser)
// DELETE
router.delete('/:id', UserController.deleteUser)

router.post('/login', UserController.loginUser)
router.post('/change-password', UserController.changePassword)


module.exports = router