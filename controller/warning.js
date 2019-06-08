var Warning = require('../model/warning');
var Realtime = require('../model/realtime_temprature');
var mongoose = require('mongoose');
require('mongoose-pagination');
var crypto = require('crypto');
const moment = require('moment');
var jwt = require('jsonwebtoken');

exports.getWarningByUser = async (req, res) => {
    const id = req.params.id;
    var today = new Date();
    var mm = String(today.getMonth() + 1).padStart(2, '');
    var yyyy = today.getFullYear();

    var dataResult = {
        code: 200,
        today: [],
        month: [],
        year: []
    }

    // query by year
    await Warning.aggregate([
        { $project: { createdAt: { $subtract: [ "$createdAt", new Date("1970-01-01") ] }, temperature: 1, isWarning: 1, ownerId: 1, year: { $year: '$createdAt' } } },
        {
            $match: {
                year: yyyy,
                ownerId: mongoose.Types.ObjectId(id),
                isWarning: true
            }
        }
    ], (err, result) => {
        if (err) return;
        if (result.length != 0) {
            dataResult.year = result;
            return;
        };
        dataResult.year = [{
            message: "No data!"
        }];
    }).exec();
    const todayGet = moment().startOf('day');

    // query by date
    await Warning.aggregate([
        { $project: { createdAt: { $subtract: [ "$createdAt", new Date("1970-01-01") ] }, isWarning: 1, temperature: 1, ownerId: 1 } },
        {
            $match: {
                createdAt: { $gte: todayGet.toDate(), $lt: moment(todayGet).endOf('day').toDate() },
                ownerId: mongoose.Types.ObjectId(id)
            }
        }
    ], (err, result) => {
        if (err) return;
        if (result.length != 0) {
            dataResult.today = result;
            return;
        };
        dataResult.today = [{
            message: "No data!"
        }];
    }).exec();

    // query by month
    await Warning.aggregate([
        { $project: { createdAt: { $subtract: [ "$createdAt", new Date("1970-01-01") ] }, month: { $month: '$createdAt' }, isWarning: 1, temperature: 1, ownerId: 1, year: { $year: '$createdAt' } } },
        {
            $match: {
                year: parseInt(yyyy),
                month: parseInt(mm),
                ownerId: mongoose.Types.ObjectId(id),
                isWarning: true
            }
        }
    ], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        if (result.length != 0) {
            dataResult.month = result;
            return;
        };
        dataResult.month = [{
            message: "No data!"
        }];
    }).exec();
    res.status(200).json(dataResult);
}

exports.add = function (req, res) {
    var obj = new Warning(req.body);
    obj.save(function (err) {
        if (err) {
            res.status(400).json({
                code: 400,
                message: "Oops, something went wrong!"
            });
            return;
        }
        res.status(200).json({
            code: 200,
            result: obj
        });
    });
}

exports.getToday = function (req, res) {
    const id = req.params.id;
    const today = moment().startOf('day');

    Realtime.aggregate([
        { $project: { createdAt: { $subtract: [ "$createdAt", new Date("1970-01-01") ] }, updatedAt: 1, isModeAnalytics: 1, temperature: 1, ownerId: 1 } },
        {
            $match: {
                updatedAt: { $gte: today.toDate(), $lt: moment(today).endOf('day').toDate() },
                ownerId: mongoose.Types.ObjectId(id),
                isModeAnalytics: true
            }
        }
    ], (err, result) => {
        if (err) {
            res.status(400).json({
                code: 400,
                message: "Oops, something went wrong!"
            });
            return;
        };
        if (result.length != 0) {
            res.status(200).json({
                code: 200,
                result: result
            });
            return;
        };
        res.status(200).json({
            code: 204,
            message: "No data!"
        });
    }).exec();
}