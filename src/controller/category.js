const categoryModel = require('../models/category')
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const helper = require('../utils/index');
const bcrypt = require('bcrypt');

const getAllCategory = async (req, res) => {
    try {
        const data = await categoryModel.Category.findAll();
        res.json({
            msg: 'Get all category success',
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Server error',
            serverMessage: error.message,
        });
    }
};

module.exports = {
    getAllCategory
}