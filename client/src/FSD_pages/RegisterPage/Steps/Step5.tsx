import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '@/FSD_shared/lib/hooks/useAppSelector.ts';
import { useStepper } from '@/FSD_shared/lib/hooks/useStepper.tsx';
import { useAppDispatch } from '@/FSD_shared/lib/hooks/useAppDispatch.ts';
import { IFormData } from '@/FSD_shared/types/users_Types.ts';
import { registration } from '@/FSD_shared/store/slices/AuthSlice.ts';
import { AvatarInput } from '@/FSD_shared/ui/AvatarInput/AvatarInput.tsx';
import { FormInput } from '@/FSD_shared/ui';

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

		function conversionToFormData(obj: IFormData): FormData {
			const data = new FormData();
			if (obj.avatarUrl) data.append('avatar', obj.avatarUrl);
			data.append('firstName', obj.firstName);
			if (obj.secondName) data.append('secondName', obj.secondName);
			data.append('email', obj.email);
			data.append('password', obj.password);
			data.append('isEmailConfirmed', obj.isEmailConfirmed.toString());

			return data;
		}
		console.log(formData);

		const data = conversionToFormData(formData);
		console.log(data);

		dispatch(registration({ formData: data }));
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
