module.exports = class ChatDto {
  type;
  members;
  avatarUrl;
  chatName;
  id;

  constructor(model) {
    this.type = model.type;
    this.members = model.members;
    this.avatarUrl = model.avatarUrl;
    this.chatName = model.chatName;
    this.id = model.id;
  }
};
