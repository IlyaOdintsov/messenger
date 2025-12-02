const ApiError = require("../exceptions/api-error");
const ChatModel = require("../models/chat-model");
const UserModel = require("../models/user-model");
const MessageModel = require("../models/message-model");
const path = require("path");
const fs = require("fs/promises");
const ChatDto = require("../dtos/chat-dto");

class ChatsService {
  async createChat(userId, type, privateMemberId, groupName, avatar) {
    const creator = await UserModel.findById(userId);
    const privateMember = await UserModel.findById(privateMemberId);

    if (!creator || (privateMemberId && !privateMember)) {
      throw ApiError.BadRequest("Пользователь не найден");
    }

    if (type === "group" && !groupName) {
      throw new Error("У группы должно быть название");
    }

    const existingChat = await ChatModel.findOne({
      type: "private",
      participants: { $all: [userId, privateMember], $size: 2 },
    });

    if (existingChat) {
      return existingChat;
    }

    let groupAvatarUrl = "";
    if (avatar) {
      const uniqueName = Date.now() + "-" + avatar.name;
      const avatarPath = path.join(
        __dirname,
        "..",
        "uploads",
        "groups",
        uniqueName,
      );
      await avatar.mv(avatarPath);
      groupAvatarUrl = `${process.env.API_URL}/uploads/groups/${uniqueName}`;
    }

    const participants =
      type === "private"
        ? [{ userId: userId }, { userId: privateMember }]
        : [{ userId: userId, role: "owner" }];

    const chatName =
      type === "group"
        ? groupName
        : `${privateMember.firstName} ${privateMember.secondName || ""}`.trim();

    const avatarUrl =
      type === "group" ? groupAvatarUrl : privateMember.avatarUrl || "";

    const newGroup = await ChatModel.create({
      type,
      members: participants,
      chatName: chatName,
      avatarUrl: avatarUrl,
    });

    const newChatDto = new ChatDto(newGroup);
    return newChatDto;
  }

  async getChatList(userId) {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw ApiError.BadRequest("Пользователь не найден");
    }

    const chatList = await ChatModel.find({ "members.userId": userId });

    const chatListWithPrivate = await Promise.all(
      chatList.map(async (chat) => {
        const lastMessage = await MessageModel.findOne({
          chatId: chat.id,
        }).sort({ createdAt: -1 });

        if (chat.type === "private") {
          const contactId = chat.members
            .find((member) => member.userId.toString() !== userId)
            .userId.toString();

          const contact = await UserModel.findById(contactId);

          if (!contact) {
            throw ApiError.BadRequest("Пользователь не найден");
          }

          const contactName = `${contact.firstName} ${contact.secondName || ""}`;
          const contactAvatarUrl = contact.avatarUrl || "";

          return {
            id: chat.id,
            type: chat.type,
            members: chat.members,
            chatName: contactName.trim(),
            avatarUrl: contactAvatarUrl,
            lastMessage: lastMessage,
            createdAt: chat.createdAt,
            updatedAt: chat.updatedAt,
          };
        }

        return {
          id: chat.id,
          type: chat.type,
          members: chat.members,
          chatName: chat.chatName,
          avatarUrl: chat.avatarUrl,
          lastMessage: lastMessage,
          createdAt: chat.createdAt,
          updatedAt: chat.updatedAt,
        };
      }),
    );

    const chatListDto = chatListWithPrivate.map((chat) => new ChatDto(chat));
    return chatListDto;
  }

  async deleteGroup(groupId) {
    const group = await ChatModel.findById(groupId);

    if (!group) {
      throw ApiError.BadRequest("Группы не существует");
    }

    await ChatModel.deleteOne(group);
    const groupDto = new ChatDto(group);
    return groupDto;
  }

  async searchChats(search) {
    if (!search) {
      throw ApiError.BadRequest("Нет значения поиска");
    }

    const chatsList = await ChatModel.find({
      chatName: { $regex: search, $options: "i" },
    }).limit(20);

    const chatsListDto = chatsList.map((chat) => new ChatDto(chat));
    return chatsListDto;
  }

  async editChat(chatId, newAvatar, newChatName) {
    const chat = ChatModel.findById(chatId);

    if (!chat) {
      throw ApiError.BadRequest("Группы не существует");
    }

    let groupAvatarUrl = chat.avatarUrl;
    if (newAvatar) {
      if (groupAvatarUrl) {
        const filename = groupAvatarUrl.split("/").pop();
        const oldPath = path.join(
          __dirname,
          "..",
          "uploads",
          "groups",
          filename,
        );
        await fs.unlink(oldPath);
      }

      const uniqueName = Date.now() + "-" + newAvatar.name;
      const avatarPath = path.join(
        __dirname,
        "..",
        "uploads",
        "groups",
        uniqueName,
      );
      await newAvatar.mv(avatarPath);
      groupAvatarUrl = `${process.env.API_URL}/uploads/groups/${uniqueName}`;
    }

    const updateData = {
      avatarUrl: groupAvatarUrl,
      chatName: newChatName,
    };

    const updatedChat = await ChatModel.findByIdAndUpdate(chatId, updateData, {
      new: true,
    });

    console.log("updatedChat", updatedChat);
    const chatDto = new ChatDto(updatedChat);
    return chatDto;
  }
}

module.exports = new ChatsService();
