import { SearchInput } from '../../../shared';
import { ChatList } from './ChatList/ChatList';

import './styles.scss';
import plus from '../../../assets/plus.svg';
import { ModalOverlay } from '../../../shared/ModalOverlay/ModalOverlay';
import { NewChatPage } from '../../../pages/NewChatPage/NewChatPage';
import { useState } from 'react';

export const ChatListPanel = () => {
	const [isModalShown, setIsModalShown] = useState(false);

	return (
		<div className="chatListPanel">
			<div className="chats-row">
				<h2>Chats</h2>
				<div className="chats-manage-btn" onClick={() => setIsModalShown(true)}>
					<img src={plus} alt="plus" />
				</div>
				<ModalOverlay isOpen={isModalShown} onClose={() => setIsModalShown(false)}>
					<NewChatPage onClose={() => setIsModalShown(false)} />
				</ModalOverlay>
			</div>

			<SearchInput />

			<ChatList />
		</div>
	);
};
