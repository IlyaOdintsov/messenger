import type { Group } from '../../../../types/chats_Types';
import './styles.scss';
import menuIcon from '../../../../assets/menu.svg';

interface ChatHeader {
	currentChat: Group | null;
}

export const ChatHeader = ({ currentChat }: ChatHeader) => {
	const avatarUrl = currentChat?.avatarUrl;
	const groupName = currentChat?.groupName;
	const membersCount = currentChat?.members.length;

	if (!currentChat) return;
	return (
		<div className="chat-header">
			<div className="avatarWrapper">
				{avatarUrl ? <img src={`http://localhost:5000${avatarUrl}`} alt="groupAvatar" /> : <h1>{groupName?.[0].toUpperCase()}</h1>}
			</div>

			<div className="infoWrapper">
				<h3>{groupName}</h3>
				<p>{membersCount}</p>
			</div>

			<div className="buttonsWrapper">
				<button className="menuBtn">
					<img src={menuIcon} alt="menu" />
				</button>
			</div>
		</div>
	);
};
