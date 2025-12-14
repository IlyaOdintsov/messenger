import { ChatBlock } from '../../../../shared';
import './styles.scss';
import emptyChatListIcon from '../../../../assets/emptyChatList.svg';
import { useScrollbar } from '../../../../hooks/useScrollbar';
import { useRef } from 'react';
import { useTypedSelector } from '../../../../hooks/useAppSelector';
import type { Group } from '../../../../types/chats_Types.ts';

type TChatList = {
	searchedChats: Group[] | null;
};

export const ChatList = ({ searchedChats }: TChatList) => {
	const chatsList = useTypedSelector((state) => state.chats.groupData);
	const filteredChats = [...chatsList].sort((a, b) => {
		const timeA = a.lastMessage?.createdAt ? new Date(a.lastMessage.createdAt).getTime() : new Date(a.updatedAt).getTime();
		const timeB = b.lastMessage?.createdAt ? new Date(b.lastMessage.createdAt).getTime() : new Date(b.updatedAt).getTime();

		return timeB - timeA;
	});
	const chats = searchedChats ? searchedChats : filteredChats;

	const chatListRef = useRef<HTMLDivElement>(null);
	const hasScrollbar = useScrollbar(chatListRef, chats);

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
