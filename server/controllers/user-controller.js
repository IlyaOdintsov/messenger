const userService = require('../service/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
			}
			const { formData } = req.body;
			const userData = await userService.registration(formData);

			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const userData = await userService.login(email, password);

			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const token = await userService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.json(token);
		} catch (e) {
			next(e);
		}
	}

	async sendEmailActivationCode(req, res, next) {
		try {
			const { email } = req.body;

			await userService.sendEmailActivationCode(email);
		} catch (e) {
			next(e);
		}
	}

	async activateEmail(req, res, next) {
		try {
			const { email, code } = req.body;
			console.log(email, code);

			const isEmailActivated = await userService.activateEmail(email, code);
			return res.json(isEmailActivated);
		} catch (e) {
			next(e);
		}
	}

	async activatePhone(req, res, next) {
		try {
		} catch (e) {
			next(e);
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await userService.refresh(refreshToken);

			res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async getUsers(req, res, next) {
		try {
			const users = await userService.getAllUsers();
			res.json(users);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new UserController();
