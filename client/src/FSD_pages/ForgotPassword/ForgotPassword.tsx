import { Link } from 'react-router-dom';
import './styles.scss';
import { useState } from 'react';
import AuthService from '@/FSD_shared/api/AuthService.ts';
import { FormInput } from '@/FSD_shared/ui';

export const ForgotPassword = () => {
	const [resetEmail, setResetEmail] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	function handleReset(e: React.FormEvent) {
		e.preventDefault();

		if (!resetEmail) {
			setError('Необходимо ввести email');
			return;
		}

		try {
			AuthService.forgotPassword(resetEmail);
			setSuccess('Письмо для смены пароля отправлено на ваш email');
			setResetEmail('');
		} catch (e: any) {
			setError(e.response.data.message);
		}
	}

	return (
		<div className="center-screen">
			<div className="container gap-8 max-w-25 forgotPassPage">
				<div>
					<h2>Reset password</h2>
					<p>Enter your email</p>
				</div>

				<form className="flex flex-col gap-4 w-full" method="POST" action="/submit" autoComplete="off" noValidate>
					<b>Email</b>

					<FormInput
						onChange={(e) => {
							setError('');
							setResetEmail(e);
						}}
						inputValue={resetEmail}
						inputType="email"
						inputName="email"
						placeholder="mail@example.com"
					/>

					<button onClick={handleReset} className="btn btn-primary">
						Reset
					</button>
				</form>

				{success && <div style={{ alignSelf: 'center' }}>{success}</div>}

				{error && <div className="error">{error}</div>}

				<Link className="link" to="/login">
					Войти в аккаунт
				</Link>
			</div>
		</div>
	);
};
