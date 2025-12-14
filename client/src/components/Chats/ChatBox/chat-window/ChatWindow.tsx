import { useEffect, useRef, useState } from 'react';
import type { Group, Message } from '../../../../types/chats_Types';
import './styles.scss';
import { socket } from '../../../../App';
import { useTypedSelector } from '../../../../hooks/useAppSelector';
import MessagesService from '../../../../services/MessagesService.tsx';
import paperclip from '../../../../assets/paperclip.svg';
import sendIcon from '../../../../assets/sendIcon.svg';
import { useScrollbar } from '../../../../hooks/useScrollbar.ts';
import { formatDate } from '../../../../features/formatDate.ts';
import { useAppDispatch } from '../../../../hooks/useAppDispatch.ts';
import { updateChatLastMessage } from '../../../../store/slices/ChatSlice.ts';

interface ChatWindow {
	currentChat: Group | null;
}

export const ChatWindow = ({ currentChat }: ChatWindow) => {
	const groupId = currentChat?.id;

	const userId = useTypedSelector((state) => state.auth.data?.user.id);

	const [currentMessage, setCurrentMessage] = useState('');
	const [messages, setMessages] = useState<Message[]>([]);

	const dispatch = useAppDispatch();

	const messagesRef = useRef<HTMLDivElement>(null);
	const hasScrollbar = useScrollbar(messagesRef, messages);

	async function getMessagesList(groupId: string): Promise<void> {
		const res = await MessagesService.getMessagesList(groupId);
		setMessages(res.data);
	}

	useEffect(() => {
		socket.on('receive_message', (message: Message) => {
			console.log('message', message);
			dispatch(updateChatLastMessage(message));
			setMessages((prev) => [message, ...prev]);
		});

		return () => {
			socket.off('receive_message');
		};
	}, [groupId]);

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
		getMessagesList(groupId);
	}, [groupId]);

	useEffect(() => {
		console.log(messages);
	}, [messages]);

	return (
		<div className="chat-window">
			<div ref={messagesRef} className={`messages${hasScrollbar ? ' has-scrollbar' : ''} ${messages.length > 0 ? '' : ' empty'}`}>
				{messages.length > 0 ? (
					messages.map((message) => {
						return (
							<div key={message.id} className={`message${message.sender === userId ? ' sender' : ''}`}>
								<span className="message-text">{message.text}</span>
								<div className="message-time">{formatDate(new Date(message.createdAt), 'time')}</div>
							</div>
						);
					})
				) : (
					<>
						<h4>No Messages Yet</h4>
						<p>Send a message to start a dialogue.</p>
					</>
				)}
			</div>

			<div className="chat-footer">
				<button className="chat-attach iconWrapper">
					<img src={paperclip} alt="paperclip" />
				</button>

				<input
					className="chat-input"
					type="text"
					placeholder="message..."
					value={currentMessage}
					onChange={(e) => setCurrentMessage(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') sendMessage();
					}}
				/>

				<button className="chat-btn" onClick={sendMessage}>
					<img src={sendIcon} alt="send" />
				</button>
			</div>
		</div>
	);
};
