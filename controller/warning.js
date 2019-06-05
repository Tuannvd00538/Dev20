var Warning = require('../model/warning');
var mongoose = require('mongoose');
require('mongoose-pagination');
var crypto = require('crypto');
const moment = require('moment');
var jwt = require('jsonwebtoken');

exports.add = function (req, res) {
    var obj = new Warning(req.body);
    obj.save(function (err) {
        if (err) {
            res.send(err);
            return;
        }
        res.send(obj);
    });
}

exports.getByMonthAndYear = function (req, res) {
    const id = req.params.id;
    const qrMonth = req.params.month;
    const qrYear = req.params.year;
    Warning.aggregate([
        { $project: { createdAt: 1, month: { $month: '$createdAt' }, isWarning: 1, temperature: 1, ownerId: 1, year: { $year: '$createdAt' } } },
        {
            $match: {
                month: parseInt(qrMonth),
                year: parseInt(qrYear),
                ownerId: mongoose.Types.ObjectId(id),
                isWarning: true
            }
        }
    ], (err, result) => {
        if (err) {
            res.send(err);
            return;
        };
        if (result.length != 0) {
            res.send(result);
            return;
        };
        res.send({
            "message": "Không có dữ liệu!"
        });
    });
}

exports.getByYear = function (req, res) {
    const id = req.params.id;
    const qrYear = req.params.year;
    Warning.aggregate([
        { $project: { createdAt: 1, temperature: 1, isWarning: 1, ownerId: 1, year: { $year: '$createdAt' } } },
        {
            $match: {
                year: parseInt(qrYear),
                ownerId: mongoose.Types.ObjectId(id),
                isWarning: true
            }
        }
    ], (err, result) => {
        if (err) {
            res.send(err);
            return;
        };
        if (result.length != 0) {
            res.send(result);
            return;
        };
        res.send({
            "message": "Không có dữ liệu!"
        });
    });
}

exports.getToday = function (req, res) {
    const id = req.params.id;

    const today = moment().startOf('day');

    Warning.aggregate([
        { $project: { createdAt: 1, isWarning: 1, temperature: 1, ownerId: 1 } },
        {
            $match: {
                createdAt: { $gte: today.toDate(), $lt: moment(today).endOf('day').toDate() },
                ownerId: mongoose.Types.ObjectId(id)
            }
        }
    ], (err, result) => {
        if (err) {
            res.send(err);
            return;
        };
        if (result.length != 0) {
            res.send(result);
            return;
        };
        res.send({
            "message": "Không có dữ liệu!"
        });
    });
}