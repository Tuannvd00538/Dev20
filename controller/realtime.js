var Realtime = require('../model/realtime_temprature');

exports.logData = (data) => {
    var obj = new Realtime(data);
    obj.save(function (err) {
        if (err) return;
        console.log("Save success!");
    });
}