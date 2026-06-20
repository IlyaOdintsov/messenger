import React, { ReactNode, forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss';

interface IconButtonProps {
	icon: string | ReactNode;
	to?: string;
	onClick?: () => void;
	className?: string;
	size?: 'sm' | 'md' | 'lg';
	variant?: 'default' | 'accent' | 'danger';
	isOpen?: boolean;
	'data-open'?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, IconButtonProps>(
	({ icon, to, onClick, className = '', size = 'md', variant = 'default', isOpen, ...rest }, ref) => {
		const baseClass = `icon-button icon-button-${size} icon-button-${variant} ${className}`;

		const isActive = isOpen === true;

		const fullClassName = `${baseClass} ${isActive ? 'icon-button-active' : ''}`;

		if (to) {
			return (
				<NavLink
					to={to}
					className={({ isActive: navIsActive }) => {
						return `${baseClass} ${navIsActive ? 'icon-button-active' : ''}`;
					}}
					onClick={onClick}
				>
					{typeof icon === 'string' ? <img src={icon} alt="icon" /> : icon}
				</NavLink>
			);
		}

		return (
			<button ref={ref as React.Ref<HTMLButtonElement>} onClick={onClick} className={fullClassName} {...rest}>
				{typeof icon === 'string' ? <img src={icon} alt="icon" /> : icon}
			</button>
		);
	}
);
