'use strict';
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin123@ds037283.mlab.com:37283/dev20', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

var app = express();

// app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var auth = require('./route/auth');
auth(app);
var warning = require('./route/warning');
warning(app);

app.set('view engine', 'html');

app.get('/login', function(req, res) {
    res.sendFile('./public/login.html', { root: __dirname })
});

app.get('/register', function(req, res) {
    res.sendFile('./public/register.html', { root: __dirname })
});

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 8080, function() {
    console.log('Server start success!');
});