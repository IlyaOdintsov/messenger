import { createContext, useContext, useState, type ReactNode } from 'react';
import type { FormData } from '../types/users_Types';

interface StepperContextType {
	step: number;
	selectedType: 'phone' | 'email' | '';
	setSelectedType: (type: 'phone' | 'email' | '') => void;
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
	resetFormData: () => void;
	nextStep: () => void;
	prevStep: () => void;
	goToStep: (step: number) => void;
}

interface StepperProviderType {
	children: ReactNode;
	maxSteps: number;
}

const defaultFormData: FormData = {
	avatarUrl: null,
	firstName: '',
	secondName: '',
	email: '',
	phone: '',
	password: '',
	isEmailConfirmed: false,
};

const StepperContext = createContext<StepperContextType | undefined>(undefined);

export const StepperProvider = ({ children, maxSteps }: StepperProviderType) => {
	const [step, setStep] = useState(1);
	const [selectedType, setSelectedType] = useState<'phone' | 'email' | ''>('');
	const [formData, setFormData] = useState<FormData>(defaultFormData);

	const resetFormData = () => setFormData(defaultFormData);

	const nextStep = () => setStep((s) => Math.min(s + 1, maxSteps));
	const prevStep = () => setStep((s) => Math.max(s - 1, 1));
	const goToStep = (s: number) => {
		if (s >= 1 && s <= maxSteps) setStep(s);
	};

	return (
		<StepperContext.Provider value={{ step, selectedType, setSelectedType, formData, setFormData, resetFormData, nextStep, prevStep, goToStep }}>
			{children}
		</StepperContext.Provider>
	);
};

export const useStepper = () => {
	const context = useContext(StepperContext);
	if (!context) throw new Error('useStepper must be used within StepperProvider');
	return context;
};
