const redisClient = require('./redis');

class CodeService {
	async saveActivationCode(email, code) {
		try {
			await redisClient.set(`activation:${email}`, code, { EX: 300 });
		} catch (err) {
			console.error('Redis error', err);
			throw err;
		}
	}

	async getActivationCode(email) {
		return await redisClient.get(`activation:${email}`);
	}

	async deleteActivationCode(email) {
		await redisClient.del(`activation:${email}`);
	}

	async saveResetToken(token, email) {
		try {
			await redisClient.set(`reset:${token}`, email, { EX: 3600 });
		} catch (err) {
			console.error('Redis error', err);
			throw err;
		}
	}

	async getResetToken(token) {
		return await redisClient.get(`reset:${token}`);
	}

	async deleteResetToken(token) {
		await redisClient.del(`reset:${token}`);
	}
}

module.exports = new CodeService();
