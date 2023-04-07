const express = require('express');
const { registerUser, loginUser, requestRefreshToken, logoutUser } = require('../controllers/authController');
const { checkToken } = require('../controllers/middlewareController');

const authRoute = express.Router();

authRoute.post('/register', registerUser)
authRoute.post('/login', loginUser)
authRoute.post('/refresh', requestRefreshToken)
authRoute.post('/logout', checkToken, logoutUser)

module.exports = authRoute;
