module.exports = class MessageDto {
  id;
  chatId;
  sender;
  text;
  createdAt;
  updatedAt;

  constructor(model) {
    this.id = model.id;
    this.chatId = model.chatId;
    this.sender = model.sender;
    this.text = model.text;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
};
