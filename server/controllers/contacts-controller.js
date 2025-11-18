const contactsService = require("../service/contacts-service");
const { getIo } = require("../router/socket");

class ContactsController {
  async addContact(req, res, next) {
    try {
      const userId = req.user.id;
      const { contactId } = req.body;

      const newContact = await contactsService.addContact(userId, contactId);
      return res.json(newContact);
    } catch (e) {
      next(e);
    }
  }

  async deleteContact(req, res, next) {
    try {
      const { userId } = req.body;
    } catch (e) {
      next(e);
    }
  }

  async getFriendsList(req, res, next) {
    try {
      const userId = req.user.id;

      const friendsList = await contactsService.getFriendsList(userId);
      return res.json(friendsList);
    } catch (e) {
      next(e);
    }
  }

  async getContact(req, res, next) {
    try {
      const contactId = req.params.contactId;
      console.log("contactId", contactId);
      const contact = await contactsService.getContact(contactId);
      return res.json(contact);
    } catch (e) {
      next(e);
    }
  }

  async searchContacts(req, res, next) {
    try {
      const { search } = req.query;

      const contactsList = await contactsService.searchContacts(search);
      return res.json(contactsList);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ContactsController();
