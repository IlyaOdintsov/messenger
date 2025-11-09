import { NavLink } from 'react-router-dom';
import './styles.scss';
import type { Group } from '../../types/chats_Types';

export const ChatBlock = (chat: Group) => {
	const chatId = chat.id;
	const chatName = chat.chatName;
	const avatarUrl = chat.avatarUrl;

	return (
		<NavLink to={String(chatId)} replace className="chatBlock">
			<div className="avatarWrapper">{avatarUrl ? <img src={avatarUrl} alt="ava" /> : <h2>{chatName ? chatName[0].toUpperCase() : ''}</h2>}</div>

			<div className="chat-description">
				<h4 className="chat-title">{chatName}</h4>
				{/*<div className="chat-title">{chatId}</div>*/}
				{/*<div className="chat-title">{chat.type}</div>*/}
				{/* {<p className="last-message">{lastMessage}</p>} */}
			</div>

			{/*<div className="time-and-counter">*/}
			{/*	/!* <div className="time">{currentTime()}</div> *!/*/}
			{/*	 {unreadCounter > 0 ? <div className="counter">{unreadCounter}</div> : ''} */}
			{/*</div>*/}
		</NavLink>
	);
};
