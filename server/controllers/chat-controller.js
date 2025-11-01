const chatsService = require('../service/chats-service');

class ChatController {
	async createGroup(req, res, next) {
		try {
			const email = req.body.email;
			const groupName = req.body.groupName;
			const avatar = req.files ? req.files.avatar : null;

			await chatsService.createGroup(email, avatar, groupName);
		} catch (e) {
			next(e);
		}
	}

	async getGroupList(req, res, next) {
		try {
			const { userId } = req.body;
			console.log('1');

			const groupList = await chatsService.getGroupList(userId);
			return res.json(groupList);
		} catch (e) {
			next(e);
		}
	}

	async deleteGroup(req, res, next) {
		try {
			const groupId = req.params.id;

			await chatsService.deleteGroup(groupId);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new ChatController();
