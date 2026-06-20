import './styles.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from '@/FSD_shared/types/Auth_Response.ts';
import { useAppDispatch } from '@/FSD_shared/lib/hooks/useAppDispatch.ts';
import ContactsService from '@/FSD_shared/api/ContactsService.ts';
import { deleteGroup } from '@/FSD_shared/store/slices/ChatSlice.ts';
import { deleteFriend } from '@/FSD_shared/store/slices/AuthSlice.ts';
import { ScrollBar } from '@/FSD_shared/ui';
import { ContactBlock } from '@/FSD_entities/contact/ui/ContactBlock/ContactBlock.tsx';
import { NewMemberModal } from '@/FSD_widgets/ChatBox/ui/NewMemberModal/NewMemberModal.tsx';
import { useCurrentChat } from '@/FSD_shared/lib/hooks/useCurrentChat.ts';
import { ActionButton } from '@/FSD_shared/ui/ButtonAction/ButtonAction.tsx';
import { Button } from '@/FSD_shared/ui/Button/Button.tsx';
import { Avatar } from '@/FSD_shared/ui/Avatar/Avatar.tsx';

export const InfoChat = () => {
	const { avatar, name: chatName, members, id, type } = useCurrentChat();

	const [membersList, setMembersList] = useState<IUser[]>([]);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleFindContact = async (contactId: string) => {
		const res = await ContactsService.getContact(contactId);
		return res.data;
	};

	useEffect(() => {
		if (!members || members.length === 0) return;

		const loadMembers = async () => {
			const contacts = await Promise.all(members.map((member) => handleFindContact(member.userId)));
			setMembersList(contacts);
		};

		loadMembers();
	}, [members]);

	function handleDelete() {
		if (!id) return;
		type === 'group' ? dispatch(deleteGroup({ groupId: id })) : dispatch(deleteFriend({ contactId: id }));
		navigate('/chats', { replace: true });
	}

	return (
		<div className="shadow-xl container">
			<div className="flex flex-col gap-4 flex-center w-full">
				{chatName && <Avatar size="xl" avatarUrl={avatar} firstName={chatName} />}

				<h3>{chatName}</h3>
			</div>

			{type === 'group' && (
				<ScrollBar dependencies={membersList} className="flex flex-col gap-4 w-full h-full overflow-auto">
					{membersList?.map((member) => (
						<ContactBlock key={member.id} {...member} />
					))}
				</ScrollBar>
			)}

			<div className="flex flex-col gap-2 flex-center w-full">
				{type === 'group' && id && (
					<ActionButton
						trigger={
							<Button variant="primary" fullWidth>
								Добавить участников
							</Button>
						}
						modal={<NewMemberModal currentChatId={id} />}
						modalSize="fixed"
					/>
				)}

				<Button fullWidth onClick={handleDelete} variant="danger">
					{type === 'group' ? 'Удалить группу' : 'Удалить из друзей'}
				</Button>
			</div>
		</div>
	);
};
