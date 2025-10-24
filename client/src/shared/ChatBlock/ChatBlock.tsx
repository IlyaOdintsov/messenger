import { NavLink } from 'react-router-dom';
import type { Chat } from '../../types/chats_Types';
import './styles.scss';

export const ChatBlock = ({ chatId, avatar, title, lastMessage, unreadCounter }: Chat) => {
	const currentTime = () => {
		const hours = new Date(lastMessage.time).getHours();
		const mins = new Date(lastMessage.time).getMinutes();

		return `${hours}:${mins}`;
	};

	return (
		<NavLink to={String(chatId)} replace className="chatBlock">
			<div className="avatar">{avatar ? <img src={avatar} alt="ava" /> : <h2>{title[0]}</h2>}</div>

			<div className="chat-description">
				<h4 className="chat-title">{title}</h4>
				<p className="last-message">{lastMessage.text}</p>
			</div>

			<div className="time-and-counter">
				<div className="time">{currentTime()}</div>
				{unreadCounter > 0 ? <div className="counter">{unreadCounter}</div> : ''}
			</div>
		</NavLink>
	);
};
