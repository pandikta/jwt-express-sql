require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require('express');
const cookieParser = require('cookie-parser');
const allRoutes = require('./routes/index.js');
const middlewareLogReq = require('./middleware/logs');
const upload = require('./middleware/multer.js');
const db = require('./config/database.js');
const { Users } = require('./models/users.js');
const app = express();

app.use(cookieParser());

try {
    db.authenticate();
    console.log('database connected');
    Users.sync();
} catch (error) {
    res.status(500).json({
        msg: error.message,
    });
}

app.use(middlewareLogReq);
app.use(express.json());
app.use('/assets', express.static('public/img'));
app.use('/', allRoutes);
app.post('/upload', upload.single('photo'), (req, res) => {
    res.json({
        msg: 'Upload Success',
    });
});

app.use((err, req, res, next) => {
    res.status(500).json({
        msg: err.message,
    });
});

app.listen(PORT, () => {
    console.log(`Server berhasil run di port ${PORT}`);
});
