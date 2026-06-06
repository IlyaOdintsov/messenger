import { NavLink } from 'react-router-dom';
import './styles.scss';
import type { IUser } from '@/FSD_shared/types/Auth_Response.ts';

export const ContactBlock = ({ id, avatarUrl, firstName, secondName, email }: IUser) => {
	return (
		<NavLink to={`/contacts/${String(id)}`} replace className="contactBlock">
			<div className="avatarWrapper">{avatarUrl ? <img src={avatarUrl} alt="ava" /> : <h2>{firstName[0].toUpperCase()}</h2>}</div>

			<div className="contact-description">
				<h4 className="contact-title">{`${firstName} ${secondName || ''}`}</h4>
				<p className="last-message">{email}</p>
			</div>
		</NavLink>
	);
};
