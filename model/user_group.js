var mongoose = require('mongoose');

module.exports = mongoose.model('user_groups', {
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "groups",
        require: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "accounts",
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        default: 1
    }
});
