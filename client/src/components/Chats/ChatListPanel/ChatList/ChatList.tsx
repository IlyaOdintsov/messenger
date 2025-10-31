import { ChatBlock } from '../../../../shared/index';
import './styles.scss';
import emptyChatListIcon from '../../../../assets/emptyChatList.svg';
import { useScrollbar } from '../../../../hooks/useScrollbar';
import { useEffect, useRef } from 'react';
import { useTypedSelector } from '../../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { getGroupList } from '../../../../store/slices/ChatSlice';

export const ChatList = () => {
	const userId = useTypedSelector((state) => state.auth.data?.user.id);
	const groups = useTypedSelector((state) => state.chats.groupData);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (userId) dispatch(getGroupList({ userId }));
	}, []);

	const chatList = useRef<HTMLDivElement>(null);
	const hasScrollbar = useScrollbar(chatList, groups);

	return (
		<div ref={chatList} className={`chatsList ${groups.length <= 0 ? 'empty' : ''} ${hasScrollbar ? 'has-scrollbar' : ''}`}>
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
