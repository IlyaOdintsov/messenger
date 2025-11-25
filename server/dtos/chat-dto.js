module.exports = class ChatDto {
  type;
  members;
  avatarUrl;
  lastMessage;
  chatName;
  createdAt;
  updatedAt;
  id;

  constructor(model) {
    this.type = model.type;
    this.members = model.members;
    this.avatarUrl = model.avatarUrl;
    this.lastMessage = model.lastMessage;
    this.chatName = model.chatName;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.id = model.id;
  }
};
