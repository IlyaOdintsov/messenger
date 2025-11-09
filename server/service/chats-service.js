const ApiError = require("../exceptions/api-error");
const ChatModel = require("../models/chat-model");
const UserModel = require("../models/user-model");
const path = require("path");
const ChatDto = require("../dtos/chat_dto");

class ChatsService {
  async createChat(userId, type, privateMemberId, groupName, avatar) {
    console.log("asdasdas", groupName);
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
          };
        }

        return {
          id: chat.id,
          type: chat.type,
          members: chat.members,
          chatName: chat.chatName,
          avatarUrl: chat.avatarUrl,
        };
      }),
    );

    const chatListDto = chatListWithPrivate.map((group) => new ChatDto(group));
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
}

module.exports = new ChatsService();
