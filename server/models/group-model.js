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
	},
	{
		timestamps: true,
	}
);

module.exports = model('Group', GroupSchema);
