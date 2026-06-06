import './styles.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Group } from '@/FSD_shared/types/chats_Types.ts';
import { IUser } from '@/FSD_shared/types/Auth_Response.ts';
import { useAppDispatch } from '@/FSD_shared/lib/hooks/useAppDispatch.ts';
import ContactsService from '@/FSD_shared/api/ContactsService.ts';
import { deleteGroup } from '@/FSD_shared/store/slices/ChatSlice.ts';
import { deleteFriend } from '@/FSD_shared/store/slices/AuthSlice.ts';
import { ScrollBar } from '@/FSD_shared/ui';
import { ContactBlock } from '@/FSD_entities/contact/ui/ContactBlock/ContactBlock.tsx';

type TEditChat = {
	currentChat: Group | null;
	handleAddMembers: () => void;
};

export const InfoChat = ({ currentChat, handleAddMembers }: TEditChat) => {
	const avatarUrl = currentChat?.avatarUrl;
	const chatName = currentChat?.chatName;
	const members = currentChat?.members;
	const chatId = currentChat?.id;
	const type = currentChat?.type;

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
		if (!chatId) return;
		type === 'group' ? dispatch(deleteGroup({ groupId: chatId })) : dispatch(deleteFriend({ contactId: chatId }));
		navigate('/chats', { replace: true });
	}

	return (
		<div className="infoChat">
			<div className="avatarAndChatName">
				<div className="avatarWrapper">{avatarUrl ? <img src={avatarUrl} alt="groupAvatar" /> : <h1>{chatName?.[0].toUpperCase()}</h1>}</div>

				<h3>{chatName}</h3>
			</div>

			{type === 'group' && (
				<ScrollBar dependencies={membersList} className="membersList">
					{membersList?.map((member) => (
						<ContactBlock key={member.id} {...member} />
					))}
				</ScrollBar>
			)}

			<div className="buttonsWrapper">
				{type === 'group' && (
					<button className="defaultBtn" onClick={handleAddMembers}>
						Добавить участников
					</button>
				)}

				<button className="defaultBtn" onClick={handleDelete}>
					{type === 'group' ? 'Удалить группу' : 'Удалить из друзей'}
				</button>
			</div>
		</div>
	);
};
