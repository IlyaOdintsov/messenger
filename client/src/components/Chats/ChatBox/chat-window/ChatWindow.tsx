import { useEffect, useState } from 'react';
import type { Group, Message } from '../../../../types/chats_Types';
import './styles.scss';
import { socket } from '../../../../App';
import { useTypedSelector } from '../../../../hooks/useAppSelector';

interface ChatWindow {
	currentChat: Group | null;
}

export const ChatWindow = ({ currentChat }: ChatWindow) => {
	const members = currentChat?.members;
	const groupId = currentChat?.id;

	const userId = useTypedSelector((state) => state.auth.data?.user.id);

	const [currentMessage, setCurrentMessage] = useState('');
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		const handler = (message: any) => {
			setMessages((prev) => [...prev, message]);
		};

		socket.on('receive_message', handler);

		return () => {
			socket.off('receive_message', handler);
		};
	}, []);

	async function sendMessage() {
		if (!currentMessage) {
			return;
		}

		const messageData = {
			chatId: groupId,
			sender: userId,
			text: currentMessage,
		};

		console.log('sending...');
		socket.emit('send_message', messageData);
		setCurrentMessage('');
	}

	useEffect(() => {
		if (!groupId) return;

		socket.emit('get_messages', groupId);

		const messageListHandler = (messages: Message[]) => {
			setMessages(messages);
		};

		socket.on('message_list', messageListHandler);

		return () => {
			socket.off('message_list', messageListHandler);
		};
	}, [groupId]);

	return (
		<div className="chat-window">
			<div className="messages">window</div>
			{messages.map((message) => {
				return <>{message.text}</>;
			})}
			<div className="chat-footer">
				<input type="text" placeholder="message..." value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} />
				<button onClick={sendMessage}>Send</button>
			</div>
		</div>
	);
};
