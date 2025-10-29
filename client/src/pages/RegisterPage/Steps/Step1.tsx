import { Link } from 'react-router-dom';
import { useStepper } from '../../../hooks/useStepper';
import { useEffect } from 'react';

export const Step1 = () => {
	const { nextStep, resetFormData } = useStepper();

	useEffect(() => {
		resetFormData();
	}, []);

	return (
		<>
			<h2>Sign up</h2>

			<button onClick={nextStep} className="defaultBtn">
				Continue with email
			</button>
			<button onClick={() => {}} className="defaultBtn guestBtn">
				Continue as a guest
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
