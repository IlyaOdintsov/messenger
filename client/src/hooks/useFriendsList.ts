import { useEffect, useState } from 'react';
import type { IUser } from '../types/Auth_Response.ts';
import ContactsService from '../services/ContactsService.ts';

export const useFriendsList = () => {
	const [friendsList, setFriendsList] = useState<IUser[]>([]);

	const loadFriends = async () => {
		const res = await ContactsService.getFriendsList();
		setFriendsList(res.data);
	};

	useEffect(() => {
		loadFriends();
	}, []);

	return friendsList;
};
