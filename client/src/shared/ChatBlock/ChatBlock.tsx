import { NavLink } from 'react-router-dom';
import './styles.scss';
import type { Group } from '../../types/chats_Types';
import { login } from '../../store/slices/AuthSlice.ts';

export const ChatBlock = (chat: Group) => {
	const chatId = chat.id;
	const chatName = chat.chatName;
	const avatarUrl = chat.avatarUrl;
    const lastMessage = chat.lastMessage?.text || '';
    const time = new Date(chat.updatedAt);

	function formatDate(time: Date): string {
		const date = new Date(time);
		const now = new Date();

		const diffDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

		if (diffDays < 1) {
			return date.toLocaleTimeString('ru-RU', {
				hour: '2-digit',
				minute: '2-digit',
			});
		}

		if (diffDays < 7) {
			const daysOfWeek = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
			return daysOfWeek[date.getDay()];
		}

		return time.toLocaleDateString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});
	}

	const date = formatDate(time);

	return (
		<NavLink to={String(chatId)} replace className="chatBlock">
			<div className="avatarWrapper">{avatarUrl ? <img src={avatarUrl} alt="ava" /> : <h2>{chatName ? chatName[0].toUpperCase() : ''}</h2>}</div>

			<div className="chat-description">
				<h4 className="chat-title">{chatName}</h4>
                <p className="last-message">{lastMessage}</p>
			</div>

			<div className="time-and-counter">
                <div className="time">{date}</div>
			{/*	 {unreadCounter > 0 ? <div className="counter">{unreadCounter}</div> : ''} */}
			</div>
		</NavLink>
	);
};
