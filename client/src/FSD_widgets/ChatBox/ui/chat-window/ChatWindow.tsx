import { useEffect, useState } from 'react';
import './styles.scss';
import MessagesService from '@/FSD_shared/api/MessagesService.ts';
import { Message } from '@/FSD_shared/types/chats_Types.ts';
import { useAppDispatch } from '@/FSD_shared/lib/hooks/useAppDispatch.ts';
import { socket } from '@/FSD_app/App.tsx';
import { updateChatLastMessage } from '@/FSD_shared/store/slices/ChatSlice.ts';
import { useCurrentChat } from '@/FSD_shared/lib/hooks/useCurrentChat.ts';
import { ChatMessages } from '@/FSD_widgets/ChatBox/ui/ChatMessages/ChatMessages.tsx';
import { ChatInput } from '@/FSD_widgets/ChatBox/ui/ChatInput/ChatInput.tsx';

export const ChatWindow = () => {
	const { id: groupId } = useCurrentChat();

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

	useEffect(() => {
		console.log('messages', messages);
	}, [messages]);

	useEffect(() => {
		console.log('groupId chatWindow', groupId);
	}, [groupId]);

	if (!groupId) return;

	return (
		<div className="chatWindow">
			<ChatMessages messages={messages} />

			<ChatInput groupId={groupId} />
		</div>
	);
};
