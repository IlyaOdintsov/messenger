import { NavLink } from 'react-router-dom';
import './styles.scss';
import type { Group } from '@/FSD_shared/types/chats_Types.ts';
import { formatDate } from '@/FSD_shared/lib/formatDate.ts';

export const ChatBlock = (chat: Group) => {
	const chatId = chat.id;
	const chatName = chat.chatName;
	const avatarUrl = chat.avatarUrl;
	const lastMessage = chat.lastMessage?.text || '';
	const time =
		new Date(chat.updatedAt).getTime() > new Date(chat.lastMessage?.createdAt || 0).getTime() ? new Date(chat.updatedAt) : new Date(chat.lastMessage.createdAt);
	const type = chat.type;

	const date = formatDate(time, 'def');

	return (
		<NavLink to={String(chatId)} replace className="chatBlock">
			<div className="avatarWrapper">{avatarUrl ? <img src={avatarUrl} alt="ava" /> : <h2>{chatName ? chatName[0].toUpperCase() : ''}</h2>}</div>

			<div className="chat-description">
				<div className="title-and-time">
					<h4 className="chat-title">{chatName}</h4>
					<span className="chat-type">{type === 'private' ? 'chat' : type}</span>
					<div className="time">{date}</div>
				</div>

				<p className="last-message">{lastMessage}</p>

				{/*{unreadCounter > 0 ? <div className="counter">{unreadCounter}</div> : ''}*/}
			</div>
		</NavLink>
	);
};
