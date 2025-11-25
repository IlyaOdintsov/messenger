import { SearchInput } from '../../../shared';
import './styles.scss';
import { ContactsList } from './ContactsList/ContactsList.tsx';
import { useEffect, useState } from 'react';
import ContactsService from '../../../services/ContactsService.tsx';
import type { IUser } from '../../../types/Auth_Response.ts';

export const ContactsListPanel = () => {
	const [friendsList, setFriendsList] = useState<IUser[]>([]);

	async function getFriendsList() {
		const res = await ContactsService.getFriendsList();
		setFriendsList(res.data);
	}

	const handleSearch = async (value: string) => {
		if (value === '') {
			getFriendsList().catch((e) => console.log(e));
		}

		if (!value || value.length < 3) return;

		const res = await ContactsService.searchContacts(value);
		setFriendsList(res.data);
	};

	useEffect(() => {
		getFriendsList().catch((e) => console.log(e));
	}, []);

	return (
		<div className="contactsListPanel">
			<div className="contacts-row">
				<h3>Contacts</h3>
			</div>

			<SearchInput onChange={handleSearch} />

			<ContactsList friendsList={friendsList} />
		</div>
	);
};
