const jwt = require('jsonwebtoken');
const userModel = require('../models/users');

const verifyToken = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    try {
        const decodedToken = jwt.decode(token, { complete: true });
        const now = Date.now() / 1000;
        let username = decodedToken.payload.username;
        let userData = await userModel.Users.findOne({
            where: { username: username },
        });

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (decodedToken.payload.exp < now || err) {
                if (err.name == 'TokenExpiredError') {
                    if (userData.remember_token == null)
                        return res
                            .status(401)
                            .json({ message: 'Refresh token is missing' });

                    jwt.verify(
                        userData.remember_token,
                        process.env.JWT_SECRET_REFRESH,
                        (err, user) => {
                            if (err)
                                return res
                                    .status(403)
                                    .json({
                                        message: 'Refresh token is invalid',
                                    });
                            const accessToken = generateAccessToken(user);
                        }
                    );
                }
            }
            req.user = user;
            next();
        });
    } catch (err) {
        res.status(401).json({
            msg: 'Token is not valid',
            err: err.message,
        });
    }
};

function generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_SECRET);
}

module.exports = verifyToken;
