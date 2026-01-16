import './styles.scss';
import { formatDate } from '../../features/formatDate.ts';
import { useTypedSelector } from '../../hooks/useAppSelector.ts';
import type { Message } from '../../types/chats_Types.ts';
import { useEffect, useState } from 'react';
import type { IUser } from '../../types/Auth_Response.ts';
import ContactsService from '../../services/ContactsService.ts';

type TMessageBlock = {
	message: Message;
};

export const MessageBlock = ({ message }: TMessageBlock) => {
	const userId = useTypedSelector((state) => state.auth.data?.user.id);
	const isUserSender = message.sender === userId;

	const [messageOwner, setMessageOwner] = useState<IUser | null>(null);

	const handleFindContact = async (contactId: string) => {
		const res = await ContactsService.getContact(contactId);
		setMessageOwner(res.data);
	};

	useEffect(() => {
		if (!message.sender) return;
		handleFindContact(message.sender);
	}, [message.sender]);

	return (
		<div className={`messageBlock${isUserSender ? ' sender' : ''}`}>
			<div className="avatarWrapper">
				{messageOwner?.avatarUrl ? <img src={messageOwner?.avatarUrl} alt="messageAvatar" /> : <h1>{messageOwner?.firstName?.[0].toUpperCase()}</h1>}
			</div>
			<div className="message">
				<div className="messageInfoWrapper">
					<span className="message-sender">{isUserSender ? 'You' : `${messageOwner?.firstName || 'friend'}`}</span>
					<span className="message-time">{formatDate(new Date(message.createdAt), 'time')}</span>
				</div>
				<span className="message-text">{message.text}</span>
			</div>
		</div>
	);
};
