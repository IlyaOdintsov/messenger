import { NavLink } from 'react-router-dom';
import './styles.scss';
import type { Group } from '../../types/chats_Types';
// id: string;
// avatarUrl: string;
// groupName: string;
// members: Member[];
// lastMessage: string;
// unreadCounter: number;

export const ChatBlock = ({ id, avatarUrl, groupName, lastMessage, unreadCounter }: Group) => {
	// const currentTime = () => {
	// 	const hours = new Date(lastMessage.time).getHours();
	// 	const mins = new Date(lastMessage.time).getMinutes();

	// 	return `${hours}:${mins}`;
	// };
	console.log(avatarUrl);

	return (
		<NavLink to={String(id)} replace className="chatBlock">
			<div className="avatarWrapper">{avatarUrl ? <img src={avatarUrl} alt="ava" /> : <h2>{groupName[0].toUpperCase()}</h2>}</div>

			<div className="chat-description">
				<h4 className="chat-title">{groupName}</h4>
				{<p className="last-message">{lastMessage}</p>}
			</div>

			<div className="time-and-counter">
				{/* <div className="time">{currentTime()}</div> */}
				{unreadCounter > 0 ? <div className="counter">{unreadCounter}</div> : ''}
			</div>
		</NavLink>
	);
};
