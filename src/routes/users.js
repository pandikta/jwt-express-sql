const express = require('express')
const UserController = require('../controller/users.js')
const router = express.Router()
const verifyToken = require('../middleware/jwtVerify')

// PUBLIC ROUTE
router.get('/', UserController.getAllUsers)
router.post('/register', UserController.register)
router.get('/:id', UserController.getUserById)
router.post('/login', UserController.loginUser)


// PROTECTED ROUTE
router.use(verifyToken)
router.put('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)
router.post('/change-password', UserController.changePassword)
router.post('/logout', UserController.logout)



module.exports = router