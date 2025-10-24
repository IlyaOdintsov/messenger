const nodemailer = require('nodemailer');

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});
	}

	async sendEmailActivationCode(to, code) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: `Активация аккаунта на ` + process.env.API_URL,
			text: `Код подтверждения: ${code}`,
			html: `
                    <div>
                        Ваш код подтверждения: ${code}
                    </div>
                  `,
		});
	}
}
module.exports = new MailService();
