import './styles.scss';
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	size?: 'sm' | 'md' | 'lg';
	variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'danger';
	isActive?: boolean;
	fullWidth?: boolean;
	loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, variant = 'default', size = 'md', isActive, fullWidth, loading, disabled, className = '', ...props }, ref) => {
		const baseClass = `button button-${variant} button-${size} ${className}`;
		const activeClass = isActive ? 'button-active' : '';
		const widthClass = fullWidth ? 'w-full' : '';

		return (
			<button ref={ref} className={`${baseClass} ${activeClass} ${widthClass}`} disabled={disabled || loading} {...props}>
				{loading ? <span className="button-loader" /> : children}
			</button>
		);
	}
);
