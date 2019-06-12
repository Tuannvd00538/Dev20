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
        { $project: { createdAt: { $subtract: ["$createdAt", new Date("1970-01-01")] }, status: 1, ownerId: 1, name: 1 } },
        {
            $match: {
                status: 1,
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

exports.getDetail = function (req, res) {
    const id = req.params.groupId;
    Group.aggregate([
        { $project: { createdAt: { $subtract: ["$createdAt", new Date("1970-01-01")] }, status: 1, name: 1 } },
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
                _id: mongoose.Types.ObjectId(id),
                status: 1
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

exports.editGroup = (req, res) => {
    Group.findOneAndUpdate({ _id: req.params.groupId, status: 1 }, req.body, { new: true }, function (err, result) {
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

exports.deleteGroup = (req, res) => {
    let data = {
        status: 0
    }
    UserGroup.updateMany({ groupId: req.params.groupId, status: 1 }, { status: 0 }, (err, result) => {
        if (err) console.log(err);
        console.log(result);
    });
    Group.findOneAndUpdate({ _id: req.params.groupId, status: 1 }, data, function (err, result) {
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
                message: "Delete success!"
            });
            return;
        };
        res.status(200).json({
            code: 204,
            message: "No data!"
        });
    });
}

exports.removeUG = (req, res) => {
    let data = {
        status: 0
    }
    UserGroup.findOneAndUpdate({ groupId: req.params.groupId, patientId: req.params.userId, status: 1 }, data, function (err, result) {
        console.log(result);

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
                message: "Delete success!"
            });
            return;
        };
        res.status(200).json({
            code: 204,
            message: "No data!"
        });
    });
}