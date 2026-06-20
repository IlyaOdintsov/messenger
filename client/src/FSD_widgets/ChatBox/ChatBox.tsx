import './styles.scss';
import { ChatHeader } from '@/FSD_widgets/ChatBox/ui/chat-header/ChatHeader.tsx';
import { ChatWindow } from '@/FSD_widgets/ChatBox/ui/chat-window/ChatWindow.tsx';
import emptyChatIcon from '@/FSD_shared/assets/icons/emptyChat.svg';
import { useCurrentChat } from '@/FSD_shared/lib/hooks/useCurrentChat.ts';

export const ChatBox = () => {
	const { currentChat } = useCurrentChat();

	if (!currentChat) {
		return (
			<div className="container chatBox text-center">
				<img src={emptyChatIcon} alt="emptyChat" className="avatar-xxl" />
				<h4>Welcome to Your Conversations</h4>
				<p>Select a chat from the list to start exploring your messages or begin a new conversation</p>
			</div>
		);
	}

	return (
		<>
			<div className="container gap-0 p-0 text-center">
				<ChatHeader />
				<ChatWindow />
			</div>
		</>
	);
};
