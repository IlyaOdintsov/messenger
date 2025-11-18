import './styles.scss';

import { Outlet } from 'react-router-dom';
import {ContactsListPanel} from "../../components/Contacts/ContactsListPanel/ContactsListPanel.tsx";

export const ContactsPage = () => {
    return (
        <div className="contactsWrapper">
            <ContactsListPanel />
            <Outlet />
        </div>
    );
};
