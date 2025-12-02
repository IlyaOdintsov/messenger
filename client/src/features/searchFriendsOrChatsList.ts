import ContactsService from '../services/ContactsService.tsx';
import type { Dispatch, SetStateAction } from 'react';
import ChatService from '../services/ChatService.ts';

type searchFriendsOrChatsList<T> = {
	value: string;
	getList: () => Promise<void>;
	type: 'friends' | 'chats';
	setState: Dispatch<SetStateAction<T[]>>;
};

export const searchFriendsOrChatsList = <T>({ value, type, getList, setState }: searchFriendsOrChatsList<T>): void => {
	const handleSearch = async (value: string) => {
		if (value === '') {
			getList().catch((e) => console.log(e));
		}

		if (!value || value.length < 2) return;

		const res = type === 'friends' ? await ContactsService.searchContacts(value) : await ChatService.searchChats(value);
		setState(res.data as T[]);
	};

	handleSearch(value).catch((e) => console.log(e));
};
