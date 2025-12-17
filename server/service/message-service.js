const ApiError = require("../exceptions/api-error");
const ChatModel = require("../models/chat-model");
const MessageModel = require("../models/message-model");
const UserModel = require("../models/user-model");
const MessageDto = require("../dtos/message-dto");
const ChatDto = require("../dtos/chat-dto");

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
    const messageDto = new MessageDto(message);

    return messageDto;
  }

  async getMessages(chatId) {
    const chat = await ChatModel.findById(chatId);

    if (!chat) {
      throw ApiError.BadRequest("Группа не найдена");
    }

    const messagesList = await MessageModel.find({ chatId });

    const messagesListDto = messagesList.map(
      (message) => new MessageDto(message),
    );
    console.log("getMessages", messagesListDto);
    return messagesListDto;
  }
}

module.exports = new MessageService();
