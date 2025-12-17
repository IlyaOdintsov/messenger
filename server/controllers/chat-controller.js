const chatsService = require("../service/chats-service");

class ChatController {
  async createChat(req, res, next) {
    try {
      const userId = req.user.id;
      const type = req.body.type;
      const privateMemberId = req.body.privateMemberId;
      const groupName = req.body.groupName;
      const avatar = req.files?.avatar;

      const newChat = await chatsService.createChat(
        userId,
        type,
        privateMemberId,
        groupName,
        avatar,
      );

      return res.json(newChat);
    } catch (e) {
      next(e);
    }
  }

  async getChatList(req, res, next) {
    try {
      const userId = req.user.id;

      const chatList = await chatsService.getChatList(userId);
      return res.json(chatList);
    } catch (e) {
      next(e);
    }
  }

  async deleteGroup(req, res, next) {
    try {
      const groupId = req.params.id;

      const groupDto = await chatsService.deleteGroup(groupId);
      return res.json(groupDto.id);
    } catch (e) {
      next(e);
    }
  }

  async searchChats(req, res, next) {
    try {
      const { search } = req.query;

      const chatsList = await chatsService.searchChats(search);
      return res.json(chatsList);
    } catch (e) {
      next(e);
    }
  }

  async editChat(req, res, next) {
    try {
      const chatId = req.params.id;
      const newChatName = req.body.chatName;
      const newAvatar = req.files?.avatar;

      const chat = await chatsService.editChat(chatId, newAvatar, newChatName);
      return res.json(chat);
    } catch (e) {
      next(e);
    }
  }

  async addMemberToGroup(req, res, next) {
    try {
      const userId = req.user.id;
      const groupId = req.body.groupId;
      const contactId = req.body.contactId;

      const chat = await chatsService.addMemberToGroup(
        userId,
        groupId,
        contactId,
      );

      return res.json(chat);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ChatController();
