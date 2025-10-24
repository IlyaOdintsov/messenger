const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
	email: { type: String, unique: true, sparse: true },
	isEmailActivated: { type: Boolean, default: false },

	phone: { type: String, unique: true, sparse: true },
	isPhoneActivated: { type: Boolean, default: false },

	password: { type: String, required: true },
	code: { type: String },
});

module.exports = model('User', UserSchema);
