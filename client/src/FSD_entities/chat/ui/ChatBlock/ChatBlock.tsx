import { NavLink } from 'react-router-dom';
import './styles.scss';
import type { Group } from '@/FSD_shared/types/chats_Types.ts';
import { formatDate } from '@/FSD_shared/lib/formatDate.ts';
import { Avatar } from '@/FSD_shared/ui/Avatar/Avatar.tsx';

export const ChatBlock = (chat: Group) => {
	const chatId = chat.id;
	const chatName = chat.chatName;
	const avatarUrl = chat.avatarUrl;
	const lastMessage = chat.lastMessage?.text || '. . .';
	const time =
		new Date(chat.updatedAt).getTime() > new Date(chat.lastMessage?.createdAt || 0).getTime() ? new Date(chat.updatedAt) : new Date(chat.lastMessage.createdAt);
	const type = chat.type;

	const date = formatDate(time, 'def');

	return (
		<NavLink to={String(chatId)} replace className="element element-hover  items-center p-3 gap-4">
			<Avatar avatarUrl={avatarUrl} firstName={chatName} size="md" borderColor="secondary" />

			<div className="w-full flex flex-col justify-between gap-2">
				<div className="flex gap-4 items-center">
					<h4 className="text">{chatName}</h4>
					<span>{type === 'private' ? 'chat' : type}</span>
					<div className="time">{date}</div>
				</div>

				<p className="text-secondary text">{lastMessage}</p>

				{/*{unreadCounter > 0 ? <div className="counter">{unreadCounter}</div> : ''}*/}
			</div>
		</NavLink>
	);
};
