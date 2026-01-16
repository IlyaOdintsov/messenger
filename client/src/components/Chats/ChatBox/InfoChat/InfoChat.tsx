import './styles.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { deleteGroup } from '../../../../store/slices/ChatSlice';
import type { Group } from '../../../../types/chats_Types.ts';
import type { IUser } from '../../../../types/Auth_Response.ts';
import ContactsService from '../../../../services/ContactsService.ts';
import { useNavigate } from 'react-router-dom';
import { deleteFriend } from '../../../../store/slices/AuthSlice.ts';
import { ContactBlock } from '../../../Contacts/ContactsListPanel/ContactsList/ContactBlock/ContactBlock.tsx';
import { ScrollBarContainer } from '../../../../shared/ScrollbarContainer/ScrollBar.tsx';

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
				<ScrollBarContainer dependencies={membersList} className="membersList">
					{membersList?.map((member) => (
						<ContactBlock key={member.id} {...member} />
					))}
				</ScrollBarContainer>
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
