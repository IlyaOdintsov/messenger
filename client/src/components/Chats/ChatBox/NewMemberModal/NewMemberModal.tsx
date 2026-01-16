import './styles.scss';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import type { IUser } from '../../../../types/Auth_Response.ts';
import { ContactBlock } from '../../../Contacts/ContactsListPanel/ContactsList/ContactBlock/ContactBlock.tsx';
import { useFriendsList } from '../../../../hooks/useFriendsList.ts';
import { addMemberToGroup } from '../../../../store/slices/ChatSlice.ts';
import { ScrollBarContainer } from '../../../../shared/ScrollbarContainer/ScrollBar.tsx';

type TNewMemberModal = {
	currentChatId: string;
	onClose: () => void;
};

export const NewMemberModal = ({ currentChatId, onClose }: TNewMemberModal) => {
	const friendsList = useFriendsList();

	const dispatch = useAppDispatch();

	function handleAddNewMember(contactId: string) {
		if (!currentChatId) return;
		dispatch(addMemberToGroup({ groupId: currentChatId, contactId: contactId }));
		onClose();
	}

	return (
		<div className="newMemberModal">
			<h2>Добавить участников</h2>

			<ScrollBarContainer dependencies={friendsList} className="friendsList">
				{friendsList.length <= 0 && <h4>No Friends Yet</h4>}

				{friendsList.map((friend: IUser) => (
					<div key={friend.id} className="friendsRow">
						<ContactBlock {...friend} />
						<button className="defaultBtn" onClick={() => handleAddNewMember(friend.id)}>
							Пригласить
						</button>
					</div>
				))}
			</ScrollBarContainer>
		</div>
	);
};
