import { ChatBlock } from '../../../../shared/index';
import './styles.scss';
import emptyChatListIcon from '../../../../assets/emptyChatList.svg';
import { useScrollbar } from '../../../../hooks/useScrollbar';
import { useRef } from 'react';
import { useTypedSelector } from '../../../../hooks/useAppSelector';

export const ChatList = () => {
	const groups = useTypedSelector((state) => state.chats.groupData);

	const chatListRef = useRef<HTMLDivElement>(null);
	const hasScrollbar = useScrollbar(chatListRef, groups);

	return (
		<div ref={chatListRef} className={`chatsList ${groups.length <= 0 ? 'empty' : ''} ${hasScrollbar ? 'has-scrollbar' : ''}`}>
			{groups.length <= 0 && (
				<>
					<img src={emptyChatListIcon} alt="emptyChat" />
					<h4>No Conversations Yet</h4>
					<p>Start a new chat or invite others to join the conversation.</p>
				</>
			)}

			{groups.map((group) => (
				<ChatBlock key={group.id} {...group} />
			))}
		</div>
	);
};
