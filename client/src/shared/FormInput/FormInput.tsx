import { type InputHTMLAttributes } from 'react';

import './styles.scss';

type FormInput = InputHTMLAttributes<HTMLInputElement> & {
	inputValue: string;
	callback: (value: string) => void;
	inputType?: 'text' | 'email' | 'password' | 'tel' | 'search ' | 'number' | 'date';
	inputName: string;
	className?: string;
};

export const FormInput = ({ inputValue, callback, inputType = 'text', inputName, className, ...props }: FormInput) => {
	return (
		<>
			<label className="form-input" htmlFor={inputName}>
				<div className="inputWrapper">
					<input
						autoComplete="off"
						value={inputValue}
						onChange={(e) => callback(e.target.value)}
						type={inputType}
						name={inputName}
						id={inputName}
						className={className}
						{...props}
					/>
				</div>
			</label>
		</>
	);
};
