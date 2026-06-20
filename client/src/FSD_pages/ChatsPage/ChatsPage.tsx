import { Outlet } from 'react-router-dom';
import { ChatListPanel } from '@/FSD_widgets/ChatListPanel/ChatListPanel.tsx';
import { ChatManager } from '@/FSD_features/chat/useChatConnection/useChatConnection.ts';
import { useTypedSelector } from '@/FSD_shared/lib/hooks/useTypedSelector.ts';
import { selectGroupData } from '@/FSD_shared/store/Selectors/chatSelectors.ts';

export const ChatsPage = () => {
	const chats = useTypedSelector(selectGroupData);

	if (!chats.length) return 'Loading...';

	return (
		<div className="grid grid-two-columns gap-8 w-full h-full">
			<ChatManager />
			<ChatListPanel />
			<Outlet />
		</div>
	);
};
