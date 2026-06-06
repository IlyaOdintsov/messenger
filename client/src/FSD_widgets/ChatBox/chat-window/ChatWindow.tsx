import { useEffect, useState } from 'react';
import './styles.scss';
import MessagesService from '@/FSD_shared/api/MessagesService.ts';
import paperclip from '@/FSD_shared/assets/icons/paperclip.svg';
import sendIcon from '@/FSD_shared/assets/icons/sendIcon.svg';
import { Group, Message } from '@/FSD_shared/types/chats_Types.ts';
import { useTypedSelector } from '@/FSD_shared/lib/hooks/useAppSelector.ts';
import { useAppDispatch } from '@/FSD_shared/lib/hooks/useAppDispatch.ts';
import { socket } from '@/FSD_app/App.tsx';
import { updateChatLastMessage } from '@/FSD_shared/store/slices/ChatSlice.ts';
import { ScrollBar } from '@/FSD_shared/ui';
import { MessageBlock } from '@/FSD_entities/message/ui/Message/Message.tsx';

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
			<ScrollBar dependencies={messages} className={`messages${messages.length > 0 ? '' : ' empty'}`}>
				{messages.length > 0 ? (
					messages.map((message) => <MessageBlock message={message} key={message.id} />)
				) : (
					<>
						<h4>No Messages Yet</h4>
						<p>Send a message to start a dialogue.</p>
					</>
				)}
			</ScrollBar>

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
