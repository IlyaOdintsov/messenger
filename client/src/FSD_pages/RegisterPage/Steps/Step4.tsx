import { useState } from 'react';
import eye from '@/FSD_shared/assets/icons/eye.svg';
import eyeClosed from '@/FSD_shared/assets/icons/eyeClosed.svg';
import { useStepper } from '@/FSD_shared/lib/hooks/useStepper.tsx';
import { FormInput } from '@/FSD_shared/ui';

export const Step4 = () => {
	const { nextStep, setFormData, formData } = useStepper();
	const [isVisible, setIsVisible] = useState(false);
	const [conPass, setConPass] = useState('');
	const [error, setError] = useState('');

	function validatePassword(password: string): boolean {
		const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
		return regex.test(password);
	}

	function handleSubmit() {
		if (formData.password.length > 32) {
			setError('Пароль не должен превышать 32 символа');
			return;
		}
		if (!validatePassword(formData.password)) {
			setError('Пароль должен содержать не менее 8 символов, хотя бы одну заглавную букву, цифру и специальный символ');
			return;
		}

		if (formData.password !== conPass) {
			setError('Введенные пароли не совпадают');
			return;
		}

		nextStep();
	}

	return (
		<>
			<h4>Enter your password</h4>

			<FormInput
				onChange={(e) => {
					setError('');
					setFormData((prev) => ({ ...prev, password: e }));
				}}
				inputType={isVisible ? 'text' : 'password'}
				inputValue={formData.password}
				inputName="password"
				placeholder="password"
			/>

			<FormInput
				onChange={(e) => {
					setError('');
					setConPass(e);
				}}
				inputType={isVisible ? 'text' : 'password'}
				inputValue={conPass}
				inputName="conPassword"
				placeholder="repeat the password"
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

			{error && <div className="error">{error}</div>}

			<button onClick={handleSubmit} className="btn btn-primary">
				Next
			</button>
		</>
	);
};
