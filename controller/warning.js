var Warning = require('../model/warning');
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
    const todayGet = moment().startOf('day');

    var dataResult = {
        code: 200,
        today: [],
        month: [],
        year: []
    }

    try {
        let nam = Warning.aggregate([
            { $project: { createdAt: { $subtract: ["$createdAt", new Date("1970-01-01")] }, temperature: 1, isWarning: 1, ownerId: 1, year: { $year: '$createdAt' } } },
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

        let thang = Warning.aggregate([
            { $project: { createdAt: { $subtract: ["$createdAt", new Date("1970-01-01")] }, month: { $month: '$createdAt' }, isWarning: 1, temperature: 1, ownerId: 1, year: { $year: '$createdAt' } } },
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

        let ngay = Warning.aggregate([
            { $project: { createdAt: { $subtract: ["$createdAt", new Date("1970-01-01")] }, isWarning: 1, temperature: 1, ownerId: 1 } },
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

        let result = await Promise.all([nam, thang, ngay]);
        
        res.status(200).json(result);
        

    } catch (error) {

        console.log(error);
        

    }
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

exports.getByMonthAndYear = function (req, res) {
    const id = req.params.id;
    const qrMonth = req.params.month;
    const qrYear = req.params.year;
    Warning.aggregate([
        { $project: { createdAt: { $subtract: ["$createdAt", new Date("1970-01-01")] }, month: { $month: '$createdAt' }, isWarning: 1, temperature: 1, ownerId: 1, year: { $year: '$createdAt' } } },
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
    });
}

exports.getByYear = function (req, res) {
    const id = req.params.id;
    const qrYear = req.params.year;
    Warning.aggregate([
        { $project: { createdAt: { $subtract: ["$createdAt", new Date("1970-01-01")] }, temperature: 1, isWarning: 1, ownerId: 1, year: { $year: '$createdAt' } } },
        {
            $match: {
                year: parseInt(qrYear),
                ownerId: mongoose.Types.ObjectId(id),
                isWarning: true
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
    });
}

exports.getToday = function (req, res) {
    const id = req.params.id;

    const today = moment().startOf('day');

    Warning.aggregate([
        { $project: { createdAt: { $subtract: ["$createdAt", new Date("1970-01-01")] }, isWarning: 1, temperature: 1, ownerId: 1 } },
        {
            $match: {
                createdAt: { $gte: today.toDate(), $lt: moment(today).endOf('day').toDate() },
                ownerId: mongoose.Types.ObjectId(id)
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
    });
}