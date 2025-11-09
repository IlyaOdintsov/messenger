const ApiError = require("../exceptions/api-error");
const GroupModel = require("../models/chat-model");
const MessageModel = require("../models/message-model");
const UserModel = require("../models/user-model");

class MessageService {
  async saveMessage(messageData) {
    const user = await UserModel.findById(messageData.sender);

    if (!user) {
      throw ApiError.BadRequest("Пользователь не найден");
    }

    const message = await MessageModel.create({
      chatId: messageData.chatId,
      sender: messageData.sender,
      text: messageData.text,
    });
    return message;
  }

  async getMessages(chatId) {
    const chat = await GroupModel.findById(chatId);

    if (!chat) {
      throw ApiError.BadRequest("Группа не найдена");
    }

    const messages = await MessageModel.find({ chatId });
    return messages;
  }
}

module.exports = new MessageService();
