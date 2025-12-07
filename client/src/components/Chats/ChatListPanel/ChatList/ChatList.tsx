import { ChatBlock } from '../../../../shared';
import './styles.scss';
import emptyChatListIcon from '../../../../assets/emptyChatList.svg';
import { useScrollbar } from '../../../../hooks/useScrollbar';
import { useEffect, useRef } from 'react';
import { useTypedSelector } from '../../../../hooks/useAppSelector';
import type { Group } from '../../../../types/chats_Types.ts';

type TChatList = {
	searchedChats: Group[] | null;
};

export const ChatList = ({ searchedChats }: TChatList) => {
	const chatsList = useTypedSelector((state) => state.chats.groupData);
	const chats = searchedChats ? searchedChats : chatsList;

	const chatListRef = useRef<HTMLDivElement>(null);
	const hasScrollbar = useScrollbar(chatListRef, chats);

	useEffect(() => {
		console.log('chats list: ', chats);
	}, [chats]);

	return (
		<div ref={chatListRef} className={`chatsList${chats.length <= 0 ? ' empty' : ''} ${hasScrollbar ? ' has-scrollbar' : ''}`}>
			{chats.length <= 0 && (
				<>
					<img src={emptyChatListIcon} alt="emptyChat" />
					<h4>No Conversations Yet</h4>
					<p>Start a new chat or invite others to join the conversation.</p>
				</>
			)}

			{chats.map((chat) => (
				<ChatBlock key={chat.id} {...chat} />
			))}
		</div>
	);
};
