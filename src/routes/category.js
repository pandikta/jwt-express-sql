const express = require('express');
const CategoryController = require('../controller/category.js');
const router = express.Router();
const verifyToken = require('../middleware/jwtVerify');

// PUBLIC ROUTE
router.get('/', CategoryController.getAllCategory);


// PROTECTED ROUTE
// router.use(verifyToken);


module.exports = router;
