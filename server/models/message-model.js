const { Schema, model } = require('mongoose');

const MessageSchema = new Schema(
	{
		chatId: { type: String, required: true },
		sender: { type: String, required: true },
		text: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

module.exports = model('Message', MessageSchema);
