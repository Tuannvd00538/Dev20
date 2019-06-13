var mongoose = require('mongoose');

module.exports = mongoose.model('realtimes', {
	ownerId: {
		type: mongoose.Schema.Types.ObjectId,
        ref: "accounts",
        require: true
	},
	temprature: {
		type: String,
		require: true
	},
	isModeAnalytics: {
		type: Boolean,
		default: false
	},
	isWarning: {
		type: Boolean,
		default: false
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
