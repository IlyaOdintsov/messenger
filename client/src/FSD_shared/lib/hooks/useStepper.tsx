import { createContext, useContext, useState, type ReactNode } from 'react';
import { IFormData } from '@/FSD_shared/types/users_Types.ts';

interface StepperContextType {
	step: number;
	formData: IFormData;
	setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
	resetFormData: () => void;
	nextStep: () => void;
	prevStep: () => void;
	goToStep: (step: number) => void;
}

interface StepperProviderType {
	children: ReactNode;
	maxSteps: number;
}

const defaultFormData: IFormData = {
	avatarUrl: null,
	firstName: '',
	secondName: '',
	email: '',
	password: '',
	isEmailConfirmed: false,
};

const StepperContext = createContext<StepperContextType | undefined>(undefined);

export const StepperProvider = ({ children, maxSteps }: StepperProviderType) => {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState<IFormData>(defaultFormData);

	const resetFormData = () => setFormData(defaultFormData);

	const nextStep = () => setStep((s) => Math.min(s + 1, maxSteps));
	const prevStep = () => setStep((s) => Math.max(s - 1, 1));
	const goToStep = (s: number) => {
		if (s >= 1 && s <= maxSteps) setStep(s);
	};

	return <StepperContext.Provider value={{ step, formData, setFormData, resetFormData, nextStep, prevStep, goToStep }}>{children}</StepperContext.Provider>;
};

export const useStepper = () => {
	const context = useContext(StepperContext);
	if (!context) throw new Error('useStepper must be used within StepperProvider');
	return context;
};
