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

var server = require("http").Server(app);
var io = require("socket.io")(server);

var realtime = require('./controller/realtime');

io.configure(function () {
    io.set("transports", ["xhr-polling"]);
    io.set("polling duration", 10);
});

io.on("connection", function (socket) {

    socket.on("disconnect", function () {
        
    });

    socket.on("PushTempratureToServer", function (ownerId, temperature, isMode) {
        console.log(`OwnerID: ${ownerId} - Temprature: ${temperature} - isMode: ${isMode}`);
        io.to(ownerId).emit("PushTempratureToClient", temperature);
        if (isMode) {
            realtime.logData({
                ownerId: ownerId,
                temprature: temperature,
                isModeAnalytics: isMode
            });
        }
    });
});

app.get('/login', function (req, res) {
    res.sendFile('./public/login.html', { root: __dirname })
});

app.get('/register', function (req, res) {
    res.sendFile('./public/register.html', { root: __dirname })
});

app.use(express.static(__dirname + '/public'));

server.listen(process.env.PORT || 8080);
console.log("Server start success!");

