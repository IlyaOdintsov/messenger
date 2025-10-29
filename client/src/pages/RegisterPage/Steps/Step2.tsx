import { useState } from 'react';
import { useStepper } from '../../../hooks/useStepper';
import { FormInput } from '../../../shared';

export const Step2 = () => {
	const { nextStep, setFormData, formData } = useStepper();
	const [error, setError] = useState('');

	function validateEmail(email: string): boolean {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	}

	function handleSubmit() {
		if (!formData.email) {
			setError('Необходимо ввести email');
			return;
		}

		if (formData.email && validateEmail(formData.email)) {
			nextStep();
		} else {
			setError('Некорректный формат email');
		}
	}

	return (
		<>
			<h4>What’s your email?</h4>
			<FormInput
				callback={(e) => {
					setError('');
					setFormData((prev) => ({ ...prev, email: e }));
				}}
				inputValue={formData.email}
				inputType="email"
				inputName="email"
				placeholder="Email"
			/>

			{error && <div className="error">{error}</div>}
			<button onClick={handleSubmit} className="defaultBtn nextBtn">
				Next
			</button>
		</>
	);
};
