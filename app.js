const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const registerRoute = require('./api/route/register');
const loginRoute = require('./api/route/login');
const clinicRoute = require('./api/route/clinic');
const verifyRoute = require('./api/route/verifyDoctor');
const cors = require('cors');
mongoose.connect('mongodb://localhost:27017/ClinicBM', {useNewUrlParser: true });

app.use(morgan('dev'));
app.use('/uploads',express.static('./uploads'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());
app.use(cors());
app.use('/register', registerRoute);
app.use('/login',loginRoute);
app.use('/clinic',clinicRoute);
app.use('/verify',verifyRoute);
module.exports = app;