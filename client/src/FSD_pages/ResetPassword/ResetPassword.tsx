import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import './styles.scss';
import { useState } from 'react';
import eye from '@/FSD_shared/assets/icons/eye.svg';
import eyeClosed from '@/FSD_shared/assets/icons/eyeClosed.svg';
import AuthService from '@/FSD_shared/api/AuthService.ts';
import { FormInput } from '@/FSD_shared/ui';

export const ResetPassword = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [newPassword, setNewPassword] = useState('');
	const [conPassword, setConPassword] = useState('');
	const [error, setError] = useState('');

	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');

	const navigate = useNavigate();

	function validatePassword(password: string): boolean {
		const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
		return regex.test(password);
	}

	function handleReset(e: React.FormEvent) {
		e.preventDefault();

		if (!newPassword) {
			setError('Введите новый пароль');
			return;
		}

		if (newPassword.length > 32) {
			setError('Пароль не должен превышать 32 символа');
			return;
		}

		if (!validatePassword(newPassword)) {
			setError('Пароль должен содержать не менее 8 символов, хотя бы одну заглавную букву, цифру и специальный символ');
			return;
		}

		if (newPassword !== conPassword) {
			setError('Введенные пароли не совпадают');
			return;
		}

		try {
			AuthService.resetPassword(newPassword, token || '');
			navigate('/login', { replace: true });
		} catch (e: any) {
			setError(e.response.data.message);
		}
	}

	return (
		<div className="center-screen">
			<div className="container max-w-25 gap-8 resetPassPage">
				<div>
					<h2>New password</h2>
					<p>Change the password for your account</p>
				</div>

				<form className="flex flex-col gap-4 w-full" method="POST" action="/submit" autoComplete="off" noValidate>
					<b>New password</b>

					<FormInput
						onChange={(e) => {
							setError('');
							setNewPassword(e);
						}}
						inputValue={newPassword}
						inputType={isVisible ? 'text' : 'password'}
						inputName="newPassword"
						placeholder="* * * * * *"
					/>

					<b>Confirm the password</b>

					<FormInput
						onChange={(e) => {
							setError('');
							setConPassword(e);
						}}
						inputValue={conPassword}
						inputType={isVisible ? 'text' : 'password'}
						inputName="conPassword"
						placeholder="* * * * * *"
					/>

					<label className="showPass">
						<button
							type="button"
							className="visibilityBtn"
							onClick={() => {
								setIsVisible(!isVisible);
							}}
						>
							{isVisible ? <img src={eye} alt="eye" /> : <img src={eyeClosed} alt="eyeClosed" />}
						</button>
						показать пароль
					</label>

					<button onClick={handleReset} className="btn btn-primary w-full">
						Continue
					</button>
				</form>

				{error && <div className="error">{error}</div>}

				<Link className="link" to="/login">
					Войти в аккаунт
				</Link>
			</div>
		</div>
	);
};
