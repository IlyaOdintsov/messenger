const chatsService = require('../service/chats-service');
const { getIo } = require('../router/socket');

class ChatController {
	async createGroup(req, res, next) {
		try {
			const userId = req.body.userId;
			const groupName = req.body.groupName;
			const avatar = req.files ? req.files.avatar : null;

			const newGroup = await chatsService.createGroup(userId, avatar, groupName);
			getIo().to(userId).emit('create_group', newGroup);
		} catch (e) {
			next(e);
		}
	}

	async getGroupList(req, res, next) {
		try {
			const { userId } = req.body;

			const groupList = await chatsService.getGroupList(userId);
			return res.json(groupList);
		} catch (e) {
			next(e);
		}
	}

	async deleteGroup(req, res, next) {
		try {
			const groupId = req.params.id;

			const groupDto = await chatsService.deleteGroup(groupId);

			groupDto.members.forEach((member) => {
				getIo().to(member.userId.toString()).emit('delete_group', groupDto.id);
			});
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new ChatController();
