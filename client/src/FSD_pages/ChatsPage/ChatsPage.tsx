import './styles.scss';
import { Outlet } from 'react-router-dom';
import { ChatListPanel } from '@/FSD_widgets/ChatListPanel/ChatListPanel.tsx';

export const ChatsPage = () => {
	return (
		<div className="chatsWrapper">
			<ChatListPanel />
			<Outlet />
		</div>
	);
};
