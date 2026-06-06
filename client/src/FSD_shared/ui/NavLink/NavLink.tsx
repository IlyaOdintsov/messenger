import { NavLink, type NavLinkProps } from 'react-router-dom';
import './styles.scss';
import type { ReactNode } from 'react';

interface NavigationLink extends NavLinkProps {
	children: string | ReactNode;
}

export const NavigationLink = ({ children, ...props }: NavigationLink) => {
	return (
		<NavLink {...props} className={({ isActive }) => `navLink ${isActive ? 'active' : ''}`}>
			{children}
		</NavLink>
	);
};
