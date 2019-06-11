var Group = require('../model/group');
var UserGroup = require('../model/user_group');
var mongoose = require('mongoose');
require('mongoose-pagination');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

exports.create = function (req, res) {
    var obj = new Group(req.body);
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

exports.createUG = function (req, res) {
    var obj = new UserGroup(req.body);
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

exports.getAll = function (req, res) {
    const id = req.params.ownerId;
    Group.aggregate([
        { $project: { createdAt: { $subtract: [ "$createdAt", new Date("1970-01-01") ] }, ownerId: 1, name: 1 } },
        {
            $match: {
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
    }).exec();
}

exports.getDetail = function (req, res) {
    const id = req.params.groupId;
    Group.aggregate([
        { $project: { createdAt: { $subtract: [ "$createdAt", new Date("1970-01-01") ] } } },
        {
            $lookup: {
                from: "user_groups",
                localField: "_id",
                foreignField: "groupId",
                as: "list"
            }
        },
        {
            $match: {
                _id: mongoose.Types.ObjectId(id)
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