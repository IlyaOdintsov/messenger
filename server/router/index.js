const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const chatController = require("../controllers/chat-controller");
const messagesController = require("../controllers/messages-controller");
const contactsController = require("../controllers/contacts-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");

// login | registration
router.post(
  "/registration",
  [
    body("email").isEmail(),
    body("firstName").isLength({ min: 3 }),
    body("secondName").optional({ checkFalsy: true }).isLength({ min: 3 }),
    body("password")
      .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
      .isLength({ min: 8, max: 32 }),
    body("isEmailConfirmed").equals("true"),
  ],
  userController.registration,
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/sendEmailActivationCode", userController.sendEmailActivationCode);
router.post("/activateEmail", userController.activateEmail);
router.get("/refresh", userController.refresh);
router.post("/forgotPassword", userController.forgotPassword);
router.post(
  "/resetPassword",
  body("newPassword")
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .isLength({ min: 8, max: 32 }),
  userController.resetPassword,
);

// chat
router.post("/createChat", authMiddleware, chatController.createChat);
router.get("/getChatList", authMiddleware, chatController.getChatList);
router.delete("/deleteGroup/:id", authMiddleware, chatController.deleteGroup);
router.get("/searchChats", authMiddleware, chatController.searchChats);

// contacts
router.post("/addContact", authMiddleware, contactsController.addContact);
router.delete(
  "/deleteContact/:searchValue",
  authMiddleware,
  contactsController.deleteContact,
);
router.get(
  "/getFriendsList",
  authMiddleware,
  contactsController.getFriendsList,
);
router.get(
  "/getContact/:contactId",
  authMiddleware,
  contactsController.getContact,
);
router.get(
  "/searchContacts",
  authMiddleware,
  contactsController.searchContacts,
);

// messages
router.get(
  "/getMessagesList/:chatId",
  authMiddleware,
  messagesController.getMessages,
);

module.exports = router;
