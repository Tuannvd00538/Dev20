var mongoose = require('mongoose');

module.exports = mongoose.model('warnings', {
	ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "accounts",
        require: true
    },
    temperature: {
        type: String,
        require: true
    },
    isWarning: {
        type: Boolean,
        default: true
    },
	createdAt: {
		type: Date,
		default: Date.now
	},
	status: {
		type: Number,
		default: 1
	}
});
