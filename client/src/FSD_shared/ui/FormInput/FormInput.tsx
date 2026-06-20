import './styles.scss';
import { InputHTMLAttributes } from 'react';

type FormInput = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
	inputValue: string;
	onChange: (value: string) => void;
	inputType?: 'text' | 'email' | 'password' | 'tel' | 'search ' | 'number' | 'date';
	inputName: string;
	className?: string;
};

export const FormInput = ({ inputValue, onChange, inputType = 'text', inputName, className, ...props }: FormInput) => {
	return (
		<>
			<input
				autoComplete="off"
				value={inputValue}
				onChange={(e) => onChange(e.target.value)}
				type={inputType}
				name={inputName}
				id={inputName}
				className={`input ${className ? className : ''}`}
				{...props}
			/>
		</>
	);
};
