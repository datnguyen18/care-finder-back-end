const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const registerRoute = require('./api/route/register');
const loginRoute = require('./api/route/login')
mongoose.connect('mongodb://localhost:27017/ClinicBM', {useNewUrlParser: true });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

app.use('/register', registerRoute);
app.use('/login',loginRoute);
module.exports = app;