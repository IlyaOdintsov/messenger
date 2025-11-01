const userService = require('../service/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const jwt = require('jsonwebtoken');

class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
			}

			// const { avatar, firstName, secondName, email, password } = req.body;
			const formData = req.body;
			const avatar = req.files ? req.files.avatar : null;

			const userData = await userService.registration(formData, avatar);
			console.log(userData);

			res.cookie('refreshToken', userData.refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async login(req, res, next) {
		try {
			const { email, password, rememberMe } = req.body;
			const userData = await userService.login(email, password, rememberMe);

			res.cookie('refreshToken', userData.refreshToken, { maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : null, httpOnly: true });
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

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await userService.refresh(refreshToken);

			const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
			const rememberMe = decoded.rememberMe || false;

			res.cookie('refreshToken', userData.refreshToken, { maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : null, httpOnly: true });
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	async forgotPassword(req, res, next) {
		try {
			const { email } = req.body;
			await userService.sendResetPassEmail(email);
		} catch (e) {
			next(e);
		}
	}

	async resetPassword(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
			}
			const { newPassword, token } = req.body;
			await userService.resetPassword(newPassword, token);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new UserController();
