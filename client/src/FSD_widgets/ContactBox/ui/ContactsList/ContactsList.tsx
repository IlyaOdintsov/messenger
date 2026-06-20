import './styles.scss';
import emptyChatListIcon from '@/FSD_shared/assets/icons/emptyChatList.svg';
import { IUser } from '@/FSD_shared/types/Auth_Response.ts';
import { useFriendsList } from '@/FSD_shared/lib/hooks/useFriendsList.ts';
import { ScrollBar } from '@/FSD_shared/ui';
import { ContactBlock } from '@/FSD_entities/contact/ui/ContactBlock/ContactBlock.tsx';

interface ContactsListProps {
	searchedFriends: IUser[] | null;
}

export const ContactsList = ({ searchedFriends }: ContactsListProps) => {
	const friendsList = useFriendsList();

	const friends = searchedFriends ? searchedFriends : friendsList;

	return (
		<ScrollBar dependencies={friends} className={`w-full h-full flex flex-col flex-center gap-4 contactsList ${friends.length <= 0 ? 'empty' : ''}`}>
			{friends.length <= 0 && (
				<>
					<img src={emptyChatListIcon} alt="emptyChat" className="avatar-xxl" />
					<h4>No Conversations Yet</h4>
					<p className="text-secondary">Start a new chat or invite others to join the conversation.</p>
				</>
			)}

			{friends.map((friend: IUser) => (
				<ContactBlock key={friend.id} {...friend} />
			))}
		</ScrollBar>
	);
};
