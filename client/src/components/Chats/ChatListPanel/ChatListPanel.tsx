import { SearchInput } from '../../../shared';
import { ChatList } from './ChatList/ChatList';

import './styles.scss';
import plus from '../../../assets/plus.svg';
import { ModalOverlay } from '../../../shared/ModalOverlay/ModalOverlay';
import { useState } from 'react';

export const ChatListPanel = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<div className="chatListPanel">
			<div className="chats-row">
				<h2>Chats</h2>
				<div className="chats-manage-btn" onClick={() => setIsModalOpen(true)}>
					<img src={plus} alt="plus" />
				</div>
				<ModalOverlay isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
					{123}
				</ModalOverlay>
			</div>

			<SearchInput />

			<ChatList />
		</div>
	);
};
