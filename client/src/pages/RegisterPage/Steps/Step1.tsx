import { Link } from 'react-router-dom';
import { useStepper } from '../../../hooks/useStepper';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { resetState } from '../../../store/slices/AuthSlice';

export const Step1 = () => {
	const { nextStep, resetFormData } = useStepper();
	const dispatch = useAppDispatch();

	useEffect(() => {
		resetFormData();
		dispatch(resetState());
	}, []);

	return (
		<>
			<h2>Sign up</h2>

			<button onClick={nextStep} className="defaultBtn">
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
