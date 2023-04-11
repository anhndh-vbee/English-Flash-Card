const jwt = require('jsonwebtoken');
const config = require('../config/config');
require('dotenv').config();

const checkToken = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = token.split(' ')[1];
        jwt.verify(accessToken, config.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                return res.status(403).json('Token is invalid');
            }
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json('Not authenticated');
    }
}

const checkAuthAdmin = (req, res, next) => {
    checkToken(req, res, () => {
        if (req.user.data.isAdmin) {
            next();
        } else {
            return res.status(403).json('Access denied. Not authorized.')
        }
    })
}

module.exports = { checkToken, checkAuthAdmin }
