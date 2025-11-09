const ApiError = require("../exceptions/api-error");
const UserModel = require("../models/user-model");
const UserDto = require("../dtos/user-dto");

class ContactsService {
  async addContact(userId, contactId) {
    const user = await UserModel.findById(userId);
    const contact = await UserModel.findById(contactId);

    if (!user || !contact) {
      throw ApiError.BadRequest("Пользователь не найден");
    }

    if (!user.friends.includes(contactId)) {
      user.friends.push(contactId);
      await user.save();
    }

    return contactId;
  }

  async deleteContact(userId, friendId) {}

  async getFriendsList(userId) {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw ApiError.BadRequest("Пользователь не найден");
    }

    const friendsList = [];

    for (const friend of user.friends) {
      const foundContact = await UserModel.findById(friend);
      const foundContactDto = new UserDto(foundContact);

      friendsList.push(foundContactDto);
    }

    return friendsList;
  }

  async getContact(contactId) {
    if (!contactId) {
      throw ApiError.BadRequest("Пользователь не найден");
    }

    const foundContact = await UserModel.findById(contactId);
    console.log(foundContact);
    const foundContactDto = new UserDto(foundContact);
    return foundContactDto;
  }

  async searchContacts(search) {
    if (!search) {
      throw ApiError.BadRequest("Нет значения поиска");
    }

    const contactsList = await UserModel.find({
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { secondName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    }).limit(20);

    const contactsListDto = contactsList.map(
      (contactsList) => new UserDto(contactsList),
    );
    return contactsListDto;
  }
}

module.exports = new ContactsService();
