import './styles.scss';
import { Step1, Step2, Step3, Step4, Step5 } from './Steps';
import { useStepper } from '@/FSD_shared/lib/hooks/useStepper.tsx';
import goBackBtn from '@/FSD_shared/assets/icons/goBackBtn.svg';

export const RegisterPage = () => {
	const { prevStep } = useStepper();

	const { step } = useStepper();

	return (
		<div className="center-screen w-full m-auto">
			<div className="registerForm rounded-lg shadow-md max-w-50 w-full flex p-8">
				<div className="relative flex flex-col flex-center max-w-50 gap-8 w-full">
					{step > 1 && (
						<button onClick={prevStep} className="backBtn">
							<img src={goBackBtn} alt="back" />
						</button>
					)}

					<div className="flex flex-col justify-center gap-4 p-4 w-full ">
						{step === 1 && <Step1 />}
						{step === 2 && <Step2 />}
						{step === 3 && <Step3 />}
						{step === 4 && <Step4 />}
						{step === 5 && <Step5 />}
					</div>
				</div>
				<div className="registerLogo max-w-50 w-full">
					<img src="/logo.svg" alt="logo" className="" />
					<div className="overlay"></div>
				</div>
			</div>
		</div>
	);
};
