const dotenv = require('dotenv');

dotenv.config();

const config = {
    PORT: process.env.PORT || 8086,
    HOST_NAME: process.env.HOST_NAME,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_ACCESS_KEY: process.env.JWT_ACCESS_KEY,
    JWT_REFRESH_KEY: process.env.JWT_REFRESH_KEY
}

module.exports = config;
