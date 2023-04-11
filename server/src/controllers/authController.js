const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const config = require('../config/config.js');

let listRefreshTokens = [];

const generateAccessToken = (user) => {
    return jwt.sign({
        data: user
    }, config.JWT_ACCESS_KEY, { expiresIn: '3h' });
}

const generateRefreshToken = (user) => {
    return jwt.sign({
        data: user
    }, config.JWT_REFRESH_KEY, { expiresIn: '30d' });
}


const registerUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashPassword
        })
        const saveUser = await newUser.save();
        res.status(200).json(saveUser);
    } catch (error) {
        res.status(500).json(error);
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({
            userName: req.body.userName
        });

        if (!user) {
            return res.status(404).json('Wrong user name')
        }
        const isCorrectPass = await bcrypt.compare(req.body.password, user.password)
        if (!isCorrectPass) {
            return res.status(404).json('Wrong password')
        }

        if (user && isCorrectPass) {
            const accessToken = generateAccessToken(user)
            const refreshToken = generateRefreshToken(user)

            listRefreshTokens.push(refreshToken);

            // lưu refreshToken vào cookie
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict'
            })

            const { password, ...otherField } = user._doc;
            res.status(200).json({ ...otherField, accessToken })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const requestRefreshToken = async (req, res) => {
    // lấy refresh token từ cookie
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json('Not authenticated');
    }

    // kiểm tra có đúng token trong list không
    if (!listRefreshTokens.includes(refreshToken)) {
        return res.status(403).json('Token invalid')
    }

    jwt.verify(refreshToken, config.JWT_REFRESH_KEY, (err, user) => {
        if (err) {
            console.log(err);
        }

        // lọc các refresh token cũ ra khỏi list
        listRefreshTokens = listRefreshTokens.filter((token) => token !== refreshToken)

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user)

        listRefreshTokens.push(newRefreshToken)

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict'
        })

        res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    })
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refreshToken');
        listRefreshTokens = listRefreshTokens.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json('Log out')
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { registerUser, loginUser, requestRefreshToken, logoutUser }
