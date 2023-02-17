const userModel = require('../models/users');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const helper = require('../utils/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
    try {
        const data = await userModel.Users.findAll();
        res.json({
            msg: 'Get all users success',
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Server error',
            serverMessage: error.message,
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await userModel.getUserById(id);
        if (data == null) {
            return res.status(404).json({
                msg: `User not found`,
            });
        }

        res.json({
            msg: `Get users ${data.name} success`,
            data: data,
        });
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            msg: 'Server error',
            serverMessage: error.message,
        });
    }
};

const register = async (req, res) => {
    const { body } = req;
    let passwordHash = await helper.hashPassword(body.password);
    try {
        let dataUsername = await userModel.Users.findOne({
            where: {
                username: body.username,
            },
        });

        if (dataUsername != null) {
            return res.status(401).json({
                msg: `Username ${body.username} all ready exist`,
            });
        }

        let dataEmail = await userModel.Users.findOne({
            where: {
                email: body.email,
            },
        });

        if (body.password.length < 6) {
            return res.status(401).json({
                msg: `Password must be at least 6 characters`,
            });
        }

        if (dataEmail != null) {
            return res.status(401).json({
                msg: `Email ${body.email} all ready registered`,
            });
        }

        let user = await userModel.Users.create({
            uuid: uuid,
            name: body.name,
            username: body.username,
            password: passwordHash,
            email: body.email,
            address: body.address,
        });

        res.json({
            msg: 'Create new user success',
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Server error',
            serverMessage: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        let data = await userModel.Users.findOne({
            where: {
                username: req.body.username,
            },
        });

        const passwordIsValid = await bcrypt.compare(
            req.body.password,
            data.password
        );

        if (!passwordIsValid) {
            return res.status(401).json({
                msg: 'Wrong Password !',
            });
        }

        let expiresIn = 15 * 60; //15 minute
        const token = jwt.sign(
            { username: data.username, name: data.name, email: data.email },
            process.env.JWT_SECRET,
            { expiresIn }
        );
        const refreshToken = jwt.sign(
            { username: data.username, name: data.name, email: data.email },
            process.env.JWT_SECRET_REFRESH,
            {
                expiresIn: '7d',
            }
        );

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            // secure: true,
            sameSite: 'strict',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        // save refresh token in remember_token coloumn
        let rememberToken = await userModel.Users.update(
            { remember_token: refreshToken },
            {
                where: {
                    username: req.body.username,
                },
            }
        );

        res.json({
            msg: 'Login Success',
            data: data,
            accessToken: token,
            // refreshToken: refreshToken
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Server error',
            serverMessage: error.message,
        });
    }
};

const changePassword = async (req, res) => {
    try {
        let username = req.body.username;
        let data = await userModel.Users.findOne({
            where: {
                username: username,
            },
        });

        if (data == null) {
            return res.status(404).json({
                msg: `Username ${username} doesn't exist`,
            });
        }

        const passwordIsValid = await bcrypt.compare(
            req.body.oldPassword,
            data.password
        );

        if (!passwordIsValid) {
            return res.status(401).json({
                msg: `Wrong password`,
            });
        }

        if (req.body.newPassword != req.body.confirmPassword) {
            return res.status(401).json({
                msg: `Password doesnt macthing`,
            });
        }

        let passwordHash = await helper.hashPassword(req.body.newPassword);
        let update = await userModel.Users.update(
            { password: passwordHash },
            {
                where: {
                    username: username,
                },
            }
        );

        return res.json({
            msg: 'Change password success',
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Server error',
            serverMessage: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        let data = await userModel.Users.findOne({
            where: {
                uuid: id,
            },
        });

        if (data == null) {
            return res.status(404).json({
                msg: `Username doesn't exist`,
            });
        }

        if (body.email == '' || body.username == '' || body.name == '')
            return res.status(406).json({
                msg: 'Update failed',
            });

        let update = await userModel.Users.update(
            {
                username: body.username,
                email: body.email,
                address: body.address,
                name: body.name,
            },
            {
                where: {
                    uuid: id,
                },
            }
        );

        res.json({
            msg: 'Update user success',
            data: {
                id: id,
                ...body,
            },
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Server error',
            serverMessage: error.message,
        });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await userModel.getUserById(id);
        if (data == null) {
            return res.status(404).json({
                msg: `User not found`,
            });
        }

        await userModel.Users.destroy({
            where: {
                uuid: id,
            },
        });
        res.json({
            msg: `Delete user success`,
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Server error',
            serverMessage: error.message,
        });
    }
};

const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token not found' });
    }

    try {
        // hapus refresh token dari database
        await userModel.Users.update(
            { remember_token: null },
            {
                where: { remember_token: refreshToken },
            }
        );

        // hapus cookie refresh token
        res.clearCookie('refreshToken');

        return res.status(200).json({ message: 'Logout success' });
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Internal server error', err: error.message });
    }
};

module.exports = {
    getAllUsers,
    register,
    updateUser,
    deleteUser,
    getUserById,
    loginUser,
    changePassword,
    logout,
};
