import { useEffect, useState } from 'react';
import { IUser } from '@/FSD_shared/types/Auth_Response.ts';
import ContactsService from '@/FSD_shared/api/ContactsService.ts';

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
