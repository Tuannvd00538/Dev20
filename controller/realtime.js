var Realtime = require('../model/realtime_temprature');
var mongoose = require('mongoose');
require('mongoose-pagination');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

exports.logData = (data) => {
    var obj = new Realtime(data);
    obj.save(function (err) {
        if (err) return;
        console.log("Save success!");
    });
}