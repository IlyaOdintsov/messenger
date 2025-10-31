import type { Group } from '../../../../types/chats_Types';
import './styles.scss';

interface ChatWindow {
	currentChat: Group | null;
}

export const ChatWindow = ({ currentChat }: ChatWindow) => {
	return <div className="chat-window">window</div>;
};
