import React, { useRef } from 'react';

const CELL_COUNT = 6;

export const CodeInput: React.FC<{ onComplete: (code: string) => void; onChange?: (value: string[]) => void }> = ({ onComplete, onChange }) => {
	const [values, setValues] = React.useState<string[]>(Array(CELL_COUNT).fill(''));
	const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
	const setRef = (el: HTMLInputElement | null, idx: number) => {
		inputsRef.current[idx] = el;
	};

	const handleChange = (idx: number, val: string) => {
		if (!/^\d?$/.test(val)) return;

		const newValues = [...values];
		newValues[idx] = val;
		setValues(newValues);

		if (val) {
			const nextEmptyIndex = newValues.findIndex((item) => item === '');

			if (nextEmptyIndex !== -1 && inputsRef.current[nextEmptyIndex]) {
				inputsRef.current[nextEmptyIndex]?.focus();
			}
		}

		if (newValues.every((v) => v.length === 1)) {
			onComplete(newValues.join(''));
		}

		if (onChange) {
			onChange(newValues);
		}
	};

	const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Backspace' && !values[idx] && idx > 0) {
			inputsRef.current[idx - 1]?.focus();
		}
	};

	return (
		<div className="codeInput">
			{values.map((v, idx) => (
				<input
					autoComplete="off"
					key={idx}
					id={String(idx)}
					ref={(el) => setRef(el, idx)}
					className="inputCell"
					type="text"
					maxLength={1}
					inputMode="numeric"
					value={v}
					onChange={(e) => handleChange(idx, e.target.value)}
					onKeyDown={(e) => handleKeyDown(idx, e)}
				/>
			))}
		</div>
	);
};
