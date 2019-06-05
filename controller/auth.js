var Account = require('../model/account');
var mongoose = require('mongoose');
require('mongoose-pagination');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

exports.getMe = function(req, res) {
    Account.aggregate([
        { $project: { fullname: 1, avatar: 1 } },
        {
            $lookup: {
                from: "warnings",
                localField: "_id",
                foreignField: "ownerId",
                as: "week"
            }
        },
        {
            $unwind: "$week"
        },
        {
            $match: {
                _id: mongoose.Types.ObjectId(req.params.id)
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

exports.add = function(req, res) {
    var obj = new Account(req.body);
    var salt = Math.random().toString(36).substring(7);
    obj.salt = salt;
    obj.password = sha512(obj.password, obj.salt);
    obj.username = obj.username.toLowerCase();
    Account.findOne({ username: obj.username }, function(err, result) {
        if (result == null) {
            obj.save(function(err) {
                if (err) {
                    res.status(400).json({
                        code: 400,
                        message: "Oops, something went wrong!"
                    });
                    return;
                }
                res.status(200).json({
                    code: 200,
                    result: {
                        id: obj._id,
                        username: obj.username,
                        fullname: obj.fullname,
                        avatar: obj.avatar,
                        createdAt: obj.createdAt
                    }
                });
            });
        } else {
            res.status(409).json({
                code: 409,
                message: "Oops, account already exists!"
            });
        }
    });

}

exports.login = function(req, res) {
    var username = req.body.username.toLowerCase();;
    var password = req.body.password;
    Account.findOne({ username: username, 'status': 1 }, function(err, result) {
        if (err) {
            res.status(400).json({
                code: 400,
                message: "Oops, something went wrong!"
            });
            return;
        }
        if (result) {
            var digestedPassword = sha512(password, result.salt);
            if (digestedPassword === result.password) {
                res.status(200).json({
                    code: 200,
                    result: { id: result._id, fullname: result.fullname, avatar: result.avatar, token: jwt.sign({ username: result.username, _id: result._id }, 'RESTFULAPIs', { expiresIn: 1440 }) }
                });
            } else {
                res.status(401).json({
                    code: 401,
                    message: "Oops, username or password is incorrect!"
                });
                return;
            }
        } else {
            res.status(404).json({
                code: 404,
                message: "Oops, account does not exist!"
            });
        }
    });
}

var sha512 = function(password, salt) {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('hex');
};

exports.sha512 = sha512;