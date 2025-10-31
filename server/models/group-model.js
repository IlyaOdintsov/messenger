const { Schema, model } = require('mongoose');

const MemberSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	role: { type: String, enum: ['owner', 'member'], default: 'member' },
});

const GroupSchema = new Schema(
	{
		avatarUrl: { type: String, default: '' },
		groupName: { type: String, required: true },
		members: { type: [MemberSchema], required: true },
		lastMessage: { type: String, default: '' },
		unreadCounter: { type: Number, default: 0 },
	},
	{
		timestamps: true,
	}
);

module.exports = model('Group', GroupSchema);
