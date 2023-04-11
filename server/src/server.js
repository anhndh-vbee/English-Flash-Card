const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const connectDB = require('./config/connectDB.js');
const config = require('./config/config.js');
const routes = require('./routes/routes.js');
const authRoute = require('./routes/auth.js');

const app = express();

const port = config.PORT;
const host_name = config.HOST_NAME;

app.use(cors());
// app.use(cors({ credentials: true, origin: 'http://localhost:8086' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

connectDB();

app.listen(port, host_name, () => {
    console.log(`Server is running at ${host_name}:${port}`);
})

app.use(routes);
app.use(authRoute);
