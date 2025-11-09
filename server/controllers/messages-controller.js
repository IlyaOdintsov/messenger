const messageService = require('../service/message-service');

class MessagesController {
    async getMessages(req, res, next) {
        try {
            const chatId = req.params.chatId;

            const messageList = await messageService.getMessages(chatId);
            return res.json(messageList);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new MessagesController();