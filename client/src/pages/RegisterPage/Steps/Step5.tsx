import { useEffect, useState } from 'react';
import { useStepper } from '../../../hooks/useStepper';
import { AvatarInput, FormInput } from '../../../shared';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { registration } from '../../../store/slices/AuthSlice';
import { useTypedSelector } from '../../../hooks/useAppSelector';
import { useNavigate } from 'react-router-dom';

export const Step5 = () => {
	const auth = useTypedSelector((state) => state.auth.isAuth);
	const registrationError = useTypedSelector((state) => state.auth.error);

	const { setFormData, formData } = useStepper();
	const [error, setError] = useState('');

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (auth) {
			navigate('/');
		}
	}, [auth]);

	function handleSubmit() {
		if (!formData.firstName) {
			setError('Необходимо ввести имя');
			return;
		}

		const isFormValid =
			formData.isEmailConfirmed &&
			formData.email.trim() !== '' &&
			Object.entries(formData)
				.filter(([key]) => !['email', 'isEmailConfirmed', 'avatarUrl', 'secondName'].includes(key))
				.every(([, value]) => value.trim() !== '');

		if (!isFormValid) {
			setError('Ошибка при регистрации');
			return;
		}

		dispatch(registration({ formData }));
	}

	useEffect(() => {
		if (!auth) {
			setError(registrationError || '');
			return;
		}
	}, [registrationError]);

	return (
		<>
			<h3>New account</h3>
			<AvatarInput onChange={(file) => setFormData((prev) => ({ ...prev, avatarUrl: file }))} value={formData.avatarUrl} />
			<FormInput
				callback={(e) => {
					setError('');
					setFormData((prev) => ({ ...prev, firstName: e }));
				}}
				inputValue={formData.firstName}
				inputType="text"
				inputName="firstName"
				placeholder="First name"
			/>
			<FormInput
				callback={(e) => {
					setError('');
					setFormData((prev) => ({ ...prev, secondName: e }));
				}}
				inputValue={formData.secondName}
				inputType="text"
				inputName="secondName"
				placeholder="Second name"
			/>

			{error && <div className="error">{error}</div>}
			<button onClick={handleSubmit} className="defaultBtn">
				Finish
			</button>
		</>
	);
};
