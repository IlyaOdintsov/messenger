import './styles.scss';
import { useFriendsList } from '@/FSD_shared/lib/hooks/useFriendsList.ts';
import { useAppDispatch } from '@/FSD_shared/lib/hooks/useAppDispatch.ts';
import { addMemberToGroup } from '@/FSD_shared/store/slices/ChatSlice.ts';
import { ScrollBar } from '@/FSD_shared/ui';
import { ContactBlock } from '@/FSD_entities/contact/ui/ContactBlock/ContactBlock.tsx';
import { IUser } from '@/FSD_shared/types/Auth_Response.ts';

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

			<ScrollBar dependencies={friendsList} className="friendsList">
				{friendsList.length <= 0 && <h4>No Friends Yet</h4>}

				{friendsList.map((friend: IUser) => (
					<div key={friend.id} className="friendsRow">
						<ContactBlock {...friend} />
						<button className="defaultBtn" onClick={() => handleAddNewMember(friend.id)}>
							Пригласить
						</button>
					</div>
				))}
			</ScrollBar>
		</div>
	);
};
