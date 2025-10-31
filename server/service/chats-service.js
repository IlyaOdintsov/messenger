const ApiError = require('../exceptions/api-error');
const GroupModel = require('../models/group-model');
const UserModel = require('../models/user-model');
const path = require('path');
const GroupDto = require('../dtos/group_dto');

class ChatsService {
	async createGroup(email, avatar, groupName) {
		const owner = await UserModel.findOne({ email });
		console.log('email', email);
		console.log('groupName', groupName);
		console.log(avatar);

		if (!owner) {
			throw ApiError.BadRequest('Пользователь не найден');
		}

		let avatarUrl = '';
		if (avatar) {
			const uniqueName = Date.now() + '-' + avatar.name;
			const avatarPath = path.join(__dirname, '..', 'uploads', 'groups', uniqueName);
			await avatar.mv(avatarPath);
			avatarUrl = `/uploads/groups/${uniqueName}`;
		}

		const group = await GroupModel.create({
			avatarUrl,
			groupName,
			members: [
				{
					userId: owner.id,
					role: 'owner',
				},
			],
		});

		return group;
	}

	async getGroupList(userId) {
		const user = await UserModel.findById(userId);
		if (!user) {
			throw ApiError.BadRequest('Пользователь не найден');
		}

		const groupList = await GroupModel.find({ 'members.userId': userId });
		const groupListDto = groupList.map((group) => new GroupDto(group));

		return groupListDto;
	}
}

module.exports = new ChatsService();
