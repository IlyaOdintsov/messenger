import './styles.scss';

import { Outlet } from 'react-router-dom';
import { ChatListPanel } from '../../components/Chats/ChatListPanel/ChatListPanel';

export const ChatsPage = () => {
	return (
		<div className="chatsWrapper">
			<ChatListPanel />
			<Outlet />
		</div>
	);
};
