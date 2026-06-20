import './styles.scss';
import { FormInput } from '@/FSD_shared/ui';
import eye from '@/FSD_shared/assets/icons/eye.svg';
import eyeClosed from '@/FSD_shared/assets/icons/eyeClosed.svg';
import { useState } from 'react';

interface LoginFormProps {
	SubmitForm: (e: React.FormEvent) => void;
	LoginValue: string;
	PasswordValue: string;
	handleLoginInput: (value: string) => void;
	handlePasswordInput: (value: string) => void;
}

export const LoginForm = ({ SubmitForm, LoginValue, PasswordValue, handleLoginInput, handlePasswordInput }: LoginFormProps) => {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<form id="login-form" className="w-full flex flex-col gap-2" method="POST" onSubmit={SubmitForm} action="/submit" autoComplete="off" noValidate>
			<span>Email address</span>

			<FormInput inputValue={LoginValue} onChange={handleLoginInput} inputType="email" inputName="email" placeholder="mail@example.com" />

			<span>Password</span>

			<div className="passwordInput">
				<FormInput
					inputValue={PasswordValue}
					onChange={handlePasswordInput}
					inputType={isVisible ? 'text' : 'password'}
					inputName="pass"
					className=""
					placeholder="* * * * * *"
				/>

				{PasswordValue && (
					<button
						type="button"
						className="visibilityBtn"
						onClick={() => {
							setIsVisible(!isVisible);
						}}
					>
						{isVisible ? <img src={eye} alt="eye" /> : <img src={eyeClosed} alt="eyeClosed" />}
					</button>
				)}
			</div>
		</form>
	);
};
