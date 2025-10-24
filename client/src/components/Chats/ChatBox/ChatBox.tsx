import { useParams } from 'react-router-dom';

import './styles.scss';
import emptyChatIcon from '../../../assets/emptyChat.svg';
import { ChatHeader } from './chat-header/ChatHeader';
import { ChatWindow } from './chat-window/ChatWindow';
import type { Chat } from '../../../types/chats_Types';
import { useEffect, useState } from 'react';

const chats: Chat[] = [
	{ chatId: 1, title: '1 title', lastMessage: { text: 'last messageeeee 1', time: 1760368728140 }, unreadCounter: 0, participants: [] },
	{ chatId: 2, title: '2 title', lastMessage: { text: 'last messageeeee 2', time: 1760368273643 }, unreadCounter: 2, participants: [] },
	{ chatId: 3, title: '3 title', lastMessage: { text: 'last messageeeee 3', time: 1760213928483 }, unreadCounter: 6, participants: [] },
	{ chatId: 4, title: '3 title', lastMessage: { text: 'last messageeeee 3', time: 1760213928483 }, unreadCounter: 6, participants: [] },
	{ chatId: 5, title: '3 title', lastMessage: { text: 'last messageeeee 3', time: 1760213928483 }, unreadCounter: 6, participants: [] },
	{ chatId: 6, title: '3 title', lastMessage: { text: 'last messageeeee 3', time: 1760213928483 }, unreadCounter: 6, participants: [] },
	{ chatId: 7, title: '3 title', lastMessage: { text: 'last messageeeee 3', time: 1760213928483 }, unreadCounter: 6, participants: [] },
	{ chatId: 8, title: '3 title', lastMessage: { text: 'last messageeeee 3', time: 1760213928483 }, unreadCounter: 6, participants: [] },
];

export const ChatBox = () => {
	const [currentChat, setCurrentChat] = useState<Chat | null>(null);
	const { chatId } = useParams();

	useEffect(() => {
		if (chats.length > 0 && chatId) {
			const currChat = chats.find((chat) => chat.chatId === Number(chatId));

			if (currChat) {
				setCurrentChat(currChat);
			}
			console.log(currChat);
		}
	}, [chatId, chats]);

	///// TODO: сделать проверку id
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
				<ChatWindow />
			</div>
		</>
	);
};
