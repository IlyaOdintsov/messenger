const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const tokenModel = require('../models/token-model');
const redisService = require('./redis-service');
const crypto = require('crypto');
const path = require('path');

class UserService {
	async registration(formData, avatar) {
		if (!formData.isEmailConfirmed) {
			throw ApiError.BadRequest('Ошибка регистрации. Email не подтвержден');
		}

		const email = formData.email;
		const password = formData.password;
		const firstName = formData.firstName;
		const secondName = formData.secondName;

		const candidate = await UserModel.findOne({ email });
		if (candidate) {
			throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
		}

		const hashPassword = await bcrypt.hash(password, 3);

		let avatarUrl = '';
		if (avatar) {
			const uniqueName = Date.now() + '-' + avatar.name;
			const avatarPath = path.join(__dirname, '..', 'uploads', 'avatars', uniqueName);
			await avatar.mv(avatarPath);
			avatarUrl = `/uploads/avatars/${uniqueName}`;
		}

		const user = await UserModel.create({ avatarUrl, firstName, secondName, email, password: hashPassword });
		const userDto = new UserDto(user);

		const tokens = tokenService.generateToken({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}

	async login(email, password, rememberMe) {
		const user = await UserModel.findOne({ email });

		if (!user) {
			throw ApiError.BadRequest('Такого пользователя не существует');
		}

		const isPassEquals = await bcrypt.compare(password, user.password);

		if (!isPassEquals) {
			throw ApiError.BadRequest('Неверный пароль');
		}

		const userDto = new UserDto(user);
		const tokens = tokenService.generateToken({ ...userDto }, rememberMe);
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}

	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}
		const userData = tokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = tokenModel.findOne(refreshToken);

		if (!tokenFromDb || !userData) {
			throw ApiError.UnauthorizedError();
		}

		const user = await UserModel.findById(userData.id);
		const userDto = new UserDto(user);
		const tokens = tokenService.generateToken({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}

	async sendEmailActivationCode(email) {
		function generateCode() {
			return crypto.randomInt(100000, 999999);
		}

		await redisService.deleteActivationCode(email);

		const code = generateCode();
		await redisService.saveActivationCode(email, code);

		await mailService.sendEmailActivationCode(email, code);
	}

	async activateEmail(email, code) {
		const correctCode = await redisService.getActivationCode(email);

		if (!correctCode) {
			throw ApiError.BadRequest('Код активации истёк');
		}

		let res = false;

		if (code === correctCode) {
			res = true;
			await redisService.deleteActivationCode(email);
		}

		return res;
	}

	async sendResetPassEmail(email) {
		const user = await UserModel.findOne({ email });

		if (!user) {
			throw ApiError.BadRequest('Пользователь не найден');
		}

		const token = crypto.randomBytes(32).toString('hex');
		const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

		await redisService.saveResetToken(tokenHash, email);

		const link = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

		await mailService.sendResetLink(email, link);
	}

	async resetPassword(newPassword, token) {
		const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
		const email = await redisService.getResetToken(tokenHash);

		if (!email) {
			throw ApiError.BadRequest('Неверный или истёкший токен');
		}

		const user = await UserModel.findOne({ email });
		user.password = await bcrypt.hash(newPassword, 3);
		await user.save();

		await redisService.deleteResetToken(tokenHash);
	}
}

module.exports = new UserService();
