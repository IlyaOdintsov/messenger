import { useParams } from 'react-router-dom';
import './styles.scss';
import { ChatHeader } from './chat-header/ChatHeader.tsx';
import { ChatWindow } from './chat-window/ChatWindow.tsx';
import { useEffect, useState } from 'react';
import { Group } from '@/FSD_shared/types/chats_Types.ts';
import { useTypedSelector } from '@/FSD_shared/lib/hooks/useAppSelector.ts';
import { socket } from '@/FSD_app/App.tsx';
import emptyChatIcon from '@/FSD_shared/assets/icons/emptyChat.svg';

export const ChatBox = () => {
	const { chatId } = useParams();
	const [currentChat, setCurrentChat] = useState<Group | null>(null);

	const groups = useTypedSelector((state) => state.chats.groupData);

	useEffect(() => {
		console.log('ChatBox');
		if (groups.length > 0 && chatId) {
			const currChat = groups.find((group) => group.id === chatId);
			if (currChat) setCurrentChat(currChat);
		}
		console.log('groups', groups);
	}, [chatId, groups]);

	useEffect(() => {
		if (!chatId) return;

		socket.emit('join_chat', chatId);

		return () => {
			socket.emit('leave_chat', chatId);
		};
	}, [chatId]);

	if (!chatId || !currentChat) {
		return (
			<div className="chatBox empty">
				<img src={emptyChatIcon} alt="emptyChat" />
				<h4>Welcome to Your Conversations</h4>
				<p>Select a chat from the list to start exploring your messages or begin a new conversation</p>
			</div>
		);
	}

	return (
		<>
			<div className="chatBox">
				<ChatHeader currentChat={currentChat} />
				<ChatWindow currentChat={currentChat} />
			</div>
		</>
	);
};
