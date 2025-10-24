import { Link } from 'react-router-dom';
import { useStepper } from '../../../hooks/useStepper';
import { useEffect } from 'react';

export const Step1 = () => {
	const { nextStep, setSelectedType, resetFormData } = useStepper();

	function handleSelect(type: 'phone' | 'email') {
		setSelectedType(type);
		nextStep();
	}

	useEffect(() => {
		resetFormData();
	}, []);

	return (
		<>
			<h2>Sign up</h2>
			<button onClick={() => handleSelect('phone')} className="defaultBtn">
				Continue with phone
			</button>
			<button onClick={() => handleSelect('email')} className="defaultBtn emailBtn">
				Continue with email
			</button>
			<div className="navigate-row">
				Already have an account?
				<Link to="/login" replace>
					Sign in
				</Link>
			</div>
		</>
	);
};
