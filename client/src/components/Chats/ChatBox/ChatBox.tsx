import { useParams } from 'react-router-dom';

import './styles.scss';
import emptyChatIcon from '../../../assets/emptyChat.svg';
import { ChatHeader } from './chat-header/ChatHeader';
import { ChatWindow } from './chat-window/ChatWindow';
import { useEffect, useState } from 'react';
import type { Group } from '../../../types/chats_Types';
import { useTypedSelector } from '../../../hooks/useAppSelector';

export const ChatBox = () => {
	const [currentChat, setCurrentChat] = useState<Group | null>(null);
	const { chatId } = useParams();

	const groups = useTypedSelector((state) => state.chats.groupData);

	useEffect(() => {
		if (groups.length > 0 && chatId) {
			const currChat = groups.find((group) => group.id === chatId);

			if (currChat) {
				setCurrentChat(currChat);
			}
		}
	}, [chatId, groups]);

	if (!chatId) {
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
