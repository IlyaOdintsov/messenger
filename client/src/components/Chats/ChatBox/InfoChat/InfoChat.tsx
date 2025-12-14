import './styles.scss';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { deleteGroup } from '../../../../store/slices/ChatSlice';
import type { Group } from '../../../../types/chats_Types.ts';
import type { IUser } from '../../../../types/Auth_Response.ts';
import ContactsService from '../../../../services/ContactsService.tsx';
import { useNavigate } from 'react-router-dom';
import { deleteFriend } from '../../../../store/slices/AuthSlice.ts';
import { ContactBlock } from '../../../Contacts/ContactsListPanel/ContactsList/ContactBlock/ContactBlock.tsx';
import { useScrollbar } from '../../../../hooks/useScrollbar.ts';

type TEditChat = {
	currentChat: Group | null;
	onClose: () => void;
};

export const InfoChat = ({ currentChat, onClose }: TEditChat) => {
	const avatarUrl = currentChat?.avatarUrl;
	const chatName = currentChat?.chatName;
	const members = currentChat?.members;
	const chatId = currentChat?.id;
	const type = currentChat?.type;

	const [membersList, setMembersList] = useState<IUser[]>([]);

	const membersRef = useRef<HTMLDivElement>(null);
	const hasScrollbar = useScrollbar(membersRef, membersList);

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

			<div ref={membersRef} className={`membersList${hasScrollbar ? ' has-scrollbar' : ''}`}>
				{membersList?.map((member) => (
					<ContactBlock key={member.id} {...member} />
				))}
			</div>

			<div className="buttonsWrapper">
				{type === 'group' && (
					<button className="defaultBtn" onClick={onClose}>
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
