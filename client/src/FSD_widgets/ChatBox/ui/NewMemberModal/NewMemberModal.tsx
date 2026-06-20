import './styles.scss';
import { useFriendsList } from '@/FSD_shared/lib/hooks/useFriendsList.ts';
import { useAppDispatch } from '@/FSD_shared/lib/hooks/useAppDispatch.ts';
import { addMemberToGroup } from '@/FSD_shared/store/slices/ChatSlice.ts';
import { ScrollBar } from '@/FSD_shared/ui';
import { ContactBlock } from '@/FSD_entities/contact/ui/ContactBlock/ContactBlock.tsx';
import { IUser } from '@/FSD_shared/types/Auth_Response.ts';
import { Button } from '@/FSD_shared/ui/Button/Button.tsx';

type TNewMemberModal = {
	currentChatId: string;
};

export const NewMemberModal = ({ currentChatId }: TNewMemberModal) => {
	const friendsList = useFriendsList();

	const dispatch = useAppDispatch();

	function handleAddNewMember(contactId: string) {
		if (!currentChatId) return;
		dispatch(addMemberToGroup({ groupId: currentChatId, contactId: contactId }));
	}

	return (
		<div className="shadow-xl container gap-8">
			<h4 className="w-full">Добавить участников</h4>

			<ScrollBar dependencies={friendsList} className="w-full h-full flex flex-col gap-4 overflow-auto">
				{friendsList.length <= 0 && <h4>No Friends Yet</h4>}

				{friendsList.map((friend: IUser) => (
					<div key={friend.id} className="w-full flex gap-4">
						<ContactBlock {...friend} />

						<Button variant="primary" onClick={() => handleAddNewMember(friend.id)}>
							Пригласить
						</Button>
					</div>
				))}
			</ScrollBar>
		</div>
	);
};
