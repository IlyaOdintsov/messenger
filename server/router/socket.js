const { Server } = require("socket.io");
const messageService = require("../service/message-service");
const chatsService = require("../service/chats-service");

let ioInstance;

function setupSocket(server) {
  ioInstance = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  ioInstance.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("join_user_room", (userId) => {
      socket.join(`user_${userId}`);
      console.log(`User with id: ${socket.id} joined user room: ${userId}`);
    });

    socket.on("leave_user_room", (userId) => {
      socket.leave(`user_${userId}`);
      console.log(`User with id: ${socket.id} left user room: ${userId}`);
    });

    // socket.on('join_group_room', (chatId) => {
    // 	socket.join(`group_${chatId}`);
    // 	console.log(`User with id: ${socket.id} joined groups room: ${chatId}`);
    // });
    //
    // socket.on('leave_group_room', (chatId) => {
    // 	socket.leave(`group_${chatId}`);
    // 	console.log(`User with id: ${socket.id} left groups room: ${chatId}`);
    // });

    socket.on("join_chat", (chatId) => {
      socket.join(`chat_${chatId}`);
      console.log(`User with id: ${socket.id} joined chat: ${chatId}`);
    });

    socket.on("leave_chat", (chatId) => {
      socket.leave(`chat_${chatId}`);
      console.log(`User with id: ${socket.id} left chat: ${chatId}`);
    });

    // socket.on('get_messages', async (chatId) => {
    // 	try {
    // 		const messages = await messageService.getMessages(chatId);
    // 		socket.emit('message_list', messages);
    // 	} catch (e) {
    // 		socket.emit('error', { message: `Ошибка при получении сообщений: ${e}` });
    // 	}
    // });

    socket.on("send_message", async (messageData) => {
      try {
        const message = await messageService.saveMessage(messageData);

        ioInstance
          .to(`chat_${messageData.chatId}`)
          .emit("receive_message", message);
      } catch (e) {
        socket.emit("error", {
          message: `Ошибка при отправке сообщения: ${e}`,
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });
}

function getIo() {
  return ioInstance;
}

module.exports = { setupSocket, getIo };
