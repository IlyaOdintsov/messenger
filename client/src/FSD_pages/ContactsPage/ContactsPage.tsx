import './styles.scss';
import { Outlet } from 'react-router-dom';
import { ContactsListPanel } from '@/FSD_widgets/ContactsListPanel/ContactsListPanel.tsx';

export const ContactsPage = () => {
	return (
		<div className="contactsWrapper">
			<ContactsListPanel />
			<Outlet />
		</div>
	);
};
