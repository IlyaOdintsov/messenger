import { useEffect, useState } from 'react';
import type { Group, Message } from '../../../../types/chats_Types';
import './styles.scss';
import { socket } from '../../../../App';
import { useTypedSelector } from '../../../../hooks/useAppSelector';
import MessagesService from '../../../../services/MessagesService.ts';
import paperclip from '../../../../assets/paperclip.svg';
import sendIcon from '../../../../assets/sendIcon.svg';
import { useAppDispatch } from '../../../../hooks/useAppDispatch.ts';
import { updateChatLastMessage } from '../../../../store/slices/ChatSlice.ts';
import { ScrollBarContainer } from '../../../../shared/ScrollbarContainer/ScrollBar.tsx';
import { MessageBlock } from '../../../../shared/Message/Message.tsx';

interface ChatWindow {
	currentChat: Group | null;
}

export const ChatWindow = ({ currentChat }: ChatWindow) => {
	const groupId = currentChat?.id;

	const userId = useTypedSelector((state) => state.auth.data?.user.id);

	const [currentMessage, setCurrentMessage] = useState('');
	const [messages, setMessages] = useState<Message[]>([]);

	const dispatch = useAppDispatch();

	async function getMessagesList(groupId: string): Promise<void> {
		console.log('groupId', groupId);
		const res = await MessagesService.getMessagesList(groupId);
		setMessages(res.data);
	}

	useEffect(() => {
		if (!groupId) return;
		getMessagesList(groupId);

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
		if (!currentMessage.trim()) return;

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
		console.log(messages);
	}, [messages]);

	useEffect(() => {
		console.log('groupId chatWindow', groupId);
	}, [groupId]);

	return (
		<div className="chat-window">
			<ScrollBarContainer dependencies={messages} className={`messages${messages.length > 0 ? '' : ' empty'}`}>
				{messages.length > 0 ? (
					messages.map((message) => <MessageBlock message={message} key={message.id} />)
				) : (
					<>
						<h4>No Messages Yet</h4>
						<p>Send a message to start a dialogue.</p>
					</>
				)}
			</ScrollBarContainer>

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
