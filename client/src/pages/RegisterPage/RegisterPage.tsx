import './styles.scss';
import { useStepper } from '../../hooks/useStepper';

import goBackBtn from '../../assets/goBackBtn.svg';
import { Step1, Step2, Step3, Step4, Step5 } from './Steps';

export const RegisterPage = () => {
	const { prevStep } = useStepper();

	const { step } = useStepper();

	return (
		<div className="container">
			<div className="registerForm">
				{step > 1 && (
					<button onClick={prevStep} className="backBtn">
						<img src={goBackBtn} alt="back" />
					</button>
				)}
				<div className="stepContainer">
					{step === 1 && <Step1 />}
					{step === 2 && <Step2 />}
					{step === 3 && <Step3 />}
					{step === 4 && <Step4 />}
					{step === 5 && <Step5 />}
				</div>
			</div>
			<div className="registerLogo">
				<img src="/logo.svg" alt="logo" />
				<div className="overlay"></div>
			</div>
		</div>
	);
};
