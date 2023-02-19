const express = require('express');
const app = express();

const userRoutes = require('./users')
const categoryRoutes = require('./category');

const apiRoutes = express.Router()

apiRoutes.use('/users', userRoutes)
apiRoutes.use('/category', categoryRoutes)

// Combine into one endpoint
const routes = app.use('/api', apiRoutes);

module.exports = routes;
