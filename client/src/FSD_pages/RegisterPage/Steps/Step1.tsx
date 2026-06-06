import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useStepper } from '@/FSD_shared/lib/hooks/useStepper.tsx';
import { useAppDispatch } from '@/FSD_shared/lib/hooks/useAppDispatch.ts';
import { resetState } from '@/FSD_shared/store/slices/AuthSlice.ts';

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
