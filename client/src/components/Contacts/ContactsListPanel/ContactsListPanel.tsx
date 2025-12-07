import { SearchInput } from '../../../shared';
import './styles.scss';
import { ContactsList } from './ContactsList/ContactsList.tsx';
import { useEffect, useState } from 'react';
import type { IUser } from '../../../types/Auth_Response.ts';
import { searchFriendsOrChatsList } from '../../../features/searchFriendsOrChatsList.ts';

export const ContactsListPanel = () => {
	const [searchedFriends, setSearchedFriends] = useState<IUser[] | null>(null);
	const [searchValue, setSearchValue] = useState('');

	const handleSearch = (value: string) => {
		setSearchValue(value);
	};

	useEffect(() => {
		searchFriendsOrChatsList({ value: searchValue, type: 'friends', setState: setSearchedFriends });
	}, [searchValue, searchedFriends]);

	return (
		<div className="contactsListPanel">
			<div className="contacts-row">
				<h3>Contacts</h3>
			</div>

			<SearchInput onChange={handleSearch} />

			<ContactsList searchedFriends={searchedFriends} />
		</div>
	);
};
