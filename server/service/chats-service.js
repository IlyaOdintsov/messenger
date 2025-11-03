const ApiError = require('../exceptions/api-error');
const GroupModel = require('../models/group-model');
const UserModel = require('../models/user-model');
const path = require('path');
const GroupDto = require('../dtos/group_dto');

class ChatsService {
	async createGroup(userId, avatar, groupName) {
		const owner = await UserModel.findById(userId);

		if (!owner) {
			throw ApiError.BadRequest('Пользователь не найден');
		}

		let avatarUrl = '';
		if (avatar) {
			const uniqueName = Date.now() + '-' + avatar.name;
			const avatarPath = path.join(__dirname, '..', 'uploads', 'groups', uniqueName);
			await avatar.mv(avatarPath);
			avatarUrl = `${process.env.API_URL}/uploads/groups/${uniqueName}`;
		}

		const newGroup = await GroupModel.create({
			avatarUrl,
			groupName,
			members: [
				{
					userId: owner.id,
					role: 'owner',
				},
			],
		});
		const newGroupDto = new GroupDto(newGroup);
		return newGroupDto;
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

	async deleteGroup(groupId) {
		const group = await GroupModel.findById(groupId);

		if (!group) {
			throw ApiError.BadRequest('Группы не существует');
		}

		await GroupModel.deleteOne(group);
		const groupDto = new GroupDto(group);
		return groupDto;
	}
}

module.exports = new ChatsService();
