var mongoose = require('mongoose');

module.exports = mongoose.model('accounts', {
	username: {
		type: String,
		require: true
	},
	password: {
		type: String,
		require: true
	},
	fullname: {
		type: String,
		require: true
	},
	avatar: {
        type: String,
        default: "https://i.imgur.com/9FCmWvm.png"
    },
	salt: String,
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
