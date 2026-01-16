import './styles.scss';
import emptyChatListIcon from '../../../../assets/emptyChatList.svg';
import { ContactBlock } from './ContactBlock/ContactBlock.tsx';
import type { IUser } from '../../../../types/Auth_Response.ts';
import { useFriendsList } from '../../../../hooks/useFriendsList.ts';
import { ScrollBarContainer } from '../../../../shared/ScrollbarContainer/ScrollBar.tsx';

interface ContactsListProps {
	searchedFriends: IUser[] | null;
}

export const ContactsList = ({ searchedFriends }: ContactsListProps) => {
	const friendsList = useFriendsList();

	const friends = searchedFriends ? searchedFriends : friendsList;

	return (
		<ScrollBarContainer dependencies={friends} className={`contactsList ${friends.length <= 0 ? 'empty' : ''}`}>
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
		</ScrollBarContainer>
	);
};
