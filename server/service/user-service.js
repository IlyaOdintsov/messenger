const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const tokenModel = require('../models/token-model');
const codeService = require('./code-service');

class UserService {
	async registration(formData) {
		const email = formData.email;
		const candidate = await UserModel.findOne({ email });
		if (candidate) {
			throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
		}

		const hashPassword = await bcrypt.hash(formData.password, 3);

		const user = await UserModel.create({ email, password: hashPassword });
		const userDto = new UserDto(user);

		const tokens = tokenService.generateToken({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}

	async login(email, password) {
		const user = await UserModel.findOne({ email });

		if (!user) {
			throw ApiError.BadRequest('Такого пользователя не существует');
		}

		const isPassEquals = await bcrypt.compare(password, user.password);

		if (!isPassEquals) {
			throw ApiError.BadRequest('Неверный пароль');
		}

		const userDto = new UserDto(user);
		const tokens = tokenService.generateToken({ ...userDto });
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

	async getAllUsers() {
		const users = await UserModel.find();
		return users;
	}

	async sendEmailActivationCode(email) {
		function generateCode(length = 6) {
			return Math.floor(Math.random() * Math.pow(10, length))
				.toString()
				.padStart(length, '0');
		}

		await codeService.deleteActivationCode(email);

		const code = generateCode();
		await codeService.saveActivationCode(email, code);

		await mailService.sendEmailActivationCode(email, code);
	}

	async activateEmail(email, code) {
		// const user = await UserModel.findOne({ email });
		const correctCode = await codeService.getActivationCode(email);

		// if (!user) {
		// throw ApiError.BadRequest('Некорректный код активации');
		// }

		if (!correctCode) {
			throw ApiError.BadRequest('Код активации истёк');
		}

		let res = false;

		if (code === correctCode) {
			res = true;
			await codeService.deleteActivationCode(email);
		}

		// user.isEmailActivated = res;
		// await user.save();

		return res;
	}
}

module.exports = new UserService();
