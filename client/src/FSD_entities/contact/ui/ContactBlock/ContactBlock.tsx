import { NavLink } from 'react-router-dom';
import './styles.scss';
import type { IUser } from '@/FSD_shared/types/Auth_Response.ts';
import { Avatar } from '@/FSD_shared/ui/Avatar/Avatar.tsx';

export const ContactBlock = ({ id, avatarUrl, firstName, secondName, email }: IUser) => {
	return (
		<NavLink to={`/contacts/${String(id)}`} replace className="element element-hover p-3 gap-4">
			<Avatar avatarUrl={avatarUrl} firstName={firstName} size="lg" />

			<div className="w-full flex flex-col justify-between gap-4 ">
				<h4>{`${firstName} ${secondName || ''}`}</h4>
				<p className="text-secondary">{email}</p>
			</div>
		</NavLink>
	);
};
