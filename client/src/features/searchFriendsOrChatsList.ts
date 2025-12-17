import ContactsService from '../services/ContactsService.ts';
import type { Dispatch, SetStateAction } from 'react';
import ChatService from '../services/ChatService.ts';

type searchFriendsOrChatsList<T> = {
	value: string;
	type: 'friends' | 'chats';
	setState: Dispatch<SetStateAction<T[] | null>>;
};

export const searchFriendsOrChatsList = <T>({ value, type, setState }: searchFriendsOrChatsList<T>): void => {
	const handleSearch = async (value: string) => {
		if (value === '') {
			setState(null);
			return;
		}

		if (value.length < 2) return;

		const res = type === 'friends' ? await ContactsService.searchContacts(value) : await ChatService.searchChats(value);
		setState(res.data as T[]);
	};

	handleSearch(value).catch((e) => console.log(e));
};
