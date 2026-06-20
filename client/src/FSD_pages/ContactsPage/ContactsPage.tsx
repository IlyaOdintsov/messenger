import { Outlet } from 'react-router-dom';
import { ContactsListPanel } from '@/FSD_widgets/ContactBox/ui/ContactsListPanel/ContactsListPanel.tsx';

export const ContactsPage = () => {
	return (
		<div className="flex gap-8 w-full h-full">
			<ContactsListPanel />
			<Outlet />
		</div>
	);
};
