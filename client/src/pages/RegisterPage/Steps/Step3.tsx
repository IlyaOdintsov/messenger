import { useEffect, useState } from 'react';
import { useStepper } from '../../../hooks/useStepper';
import { CodeInput } from '../CodeInput';
import AuthService from '../../../services/AuthService';

export const Step3 = () => {
	const { nextStep, formData, setFormData } = useStepper();
	const [error, setError] = useState('');

	const currentEmail = formData.email;

	async function handleSendCode(email: string) {
		console.log(`письмо отправлено на ${currentEmail}`);
		try {
			await AuthService.sendEmailActivationCode(email);
		} catch (e: unknown) {
			if (typeof e === 'string') setError(e);
		}
	}

	async function handleActivateEmail(email: string, code: string) {
		try {
			const response = await AuthService.activateEmail(email, code);
			return response.data;
		} catch (e: unknown) {
			if (typeof e === 'string') setError(e);
		}
	}

	useEffect(() => {
		if (currentEmail) {
			handleSendCode(currentEmail);
		}
	}, []);

	async function handleSubmit(value: string) {
		const isEmailConfirmed = await handleActivateEmail(currentEmail, value);

		if (isEmailConfirmed) {
			setFormData((prev) => ({ ...prev, isEmailConfirmed: true }));
			nextStep();
		} else {
			setError('Неверный код подтверждения');
		}
	}

	return (
		<>
			<h4>Enter sign-in code</h4>

			<p>
				We just sent it to <b>{currentEmail}</b>
			</p>
			<p>
				Haven’t received?
				<button
					onClick={() => {
						setError('');
						handleSendCode(currentEmail);
					}}
					className="resendBtn"
				>
					Resend
				</button>
			</p>

			<CodeInput onComplete={(v) => handleSubmit(v)} onChange={() => setError('')} />
			{error && <div className="error">{error}</div>}
		</>
	);
};
