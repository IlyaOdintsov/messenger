const redisClient = require('./redis');

class CodeService {
	async saveActivationCode(email, code) {
		try {
			await redisClient.set(email, code, { EX: 300 });
		} catch (err) {
			console.error('Redis error', err);
			throw err;
		}
	}

	async getActivationCode(email) {
		return await redisClient.get(email);
	}

	async deleteActivationCode(email) {
		await redisClient.del(email);
	}
}

module.exports = new CodeService();
