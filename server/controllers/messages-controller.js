const messageService = require("../service/message-service");

class MessagesController {
  async getMessages(req, res, next) {
    try {
      const userId = req.user.id;
      const chatId = req.params.chatId;

      console.log("getMessages");
      console.log(chatId);

      const messageList = await messageService.getMessages(chatId);
      return res.json(messageList.reverse());
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new MessagesController();
