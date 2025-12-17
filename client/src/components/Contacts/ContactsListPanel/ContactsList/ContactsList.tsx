import './styles.scss';
import emptyChatListIcon from '../../../../assets/emptyChatList.svg';
import { useScrollbar } from '../../../../hooks/useScrollbar';
import { useRef } from 'react';
import { ContactBlock } from './ContactBlock/ContactBlock.tsx';
import type { IUser } from '../../../../types/Auth_Response.ts';
import { useFriendsList } from '../../../../hooks/useFriendsList.ts';

interface ContactsListProps {
	searchedFriends: IUser[] | null;
}

export const ContactsList = ({ searchedFriends }: ContactsListProps) => {
	const friendsList = useFriendsList();

	const friends = searchedFriends ? searchedFriends : friendsList;

	const contactsListRef = useRef<HTMLDivElement>(null);
	const hasScrollbar = useScrollbar(contactsListRef, friends);

	return (
		<div ref={contactsListRef} className={`contactsList ${friends.length <= 0 ? 'empty' : ''} ${hasScrollbar ? 'has-scrollbar' : ''}`}>
			{friends.length <= 0 && (
				<>
					<img src={emptyChatListIcon} alt="emptyChat" />
					<h4>No Conversations Yet</h4>
					<p>Start a new chat or invite others to join the conversation.</p>
				</>
			)}

			{friends.map((friend: IUser) => (
				<ContactBlock key={friend.id} {...friend} />
			))}
		</div>
	);
};
