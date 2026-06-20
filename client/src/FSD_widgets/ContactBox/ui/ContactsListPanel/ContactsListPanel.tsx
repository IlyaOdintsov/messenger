import './styles.scss';
import { ContactsList } from '@/FSD_widgets/ContactBox/ui/ContactsList/ContactsList.tsx';
import { useEffect, useState } from 'react';
import { searchFriendsOrChatsList } from '@/FSD_shared/lib/searchFriendsOrChatsList.ts';
import { SearchInput } from '@/FSD_shared/ui';
import { IUser } from '@/FSD_shared/types/Auth_Response.ts';

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
		<div className="container contactsListPanel">
			<h3>Contacts</h3>

			<SearchInput onChange={handleSearch} />

			<ContactsList searchedFriends={searchedFriends} />
		</div>
	);
};
