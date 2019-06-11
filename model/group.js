var mongoose = require('mongoose');

module.exports = mongoose.model('groups', {
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "accounts",
        require: true
    },
    name: {
        type: String,
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
