const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post(
	'/registration',
	[
		body('formData.email').isEmail(),
		body('formData.firstName').isLength({ min: 3 }),
		body('formData.secondName').optional({ checkFalsy: true }).isLength({ min: 3 }),
		body('formData.password')
			.matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
			.isLength({ min: 8, max: 32 }),
		body('formData.phone').optional({ checkFalsy: true }).isMobilePhone('any'),
		body('formData.isEmailConfirmed').equals('true'),
	],
	userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/sendEmailActivationCode', userController.sendEmailActivationCode);
router.post('/activateEmail', userController.activateEmail);
// router.get('/activatePhone/:link', userController.activatePhone);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

module.exports = router;
