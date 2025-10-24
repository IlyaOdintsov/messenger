import type { Chat } from '../../../../types/chats_Types';
import { ChatBlock } from '../../../../shared/index';

import './styles.scss';
import emptyChatListIcon from '../../../../assets/emptyChatList.svg';
import { useScrollbar } from '../../../../hooks/useScrollbar';
import { useRef } from 'react';

// const chats: Chat[] = [];
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

export const ChatList = () => {
	const chatList = useRef<HTMLDivElement>(null);
	const hasScrollbar = useScrollbar(chatList, chats);

	return (
		<div ref={chatList} className={`chatsList ${chats.length <= 0 ? 'empty' : ''} ${hasScrollbar ? 'has-scrollbar' : ''}`}>
			{chats.length <= 0 && (
				<>
					<img src={emptyChatListIcon} alt="emptyChat" />
					<h4>No Conversations Yet</h4>
					<p>Start a new chat or invite others to join the conversation.</p>
				</>
			)}

			{chats.map((chat) => (
				<ChatBlock key={chat.chatId} {...chat} />
			))}
		</div>
	);
};
