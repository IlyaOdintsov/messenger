import { SearchInput } from '../../../shared';
import { ChatList } from './ChatList/ChatList';

import './styles.scss';
import plus from '../../../assets/plus.svg';
import { ModalOverlay } from '../../../shared/ModalOverlay/ModalOverlay';
import { NewChat } from './NewChat/NewChat';
import { useEffect, useState } from 'react';
import { searchFriendsOrChatsList } from '../../../features/searchFriendsOrChatsList.ts';
import ChatService from '../../../services/ChatService.ts';
import type { Group } from '../../../types/chats_Types.ts';

export const ChatListPanel = () => {
	const [isModalShown, setIsModalShown] = useState(false);
	const [chatsList, setChatsList] = useState<Group[]>([]);

	async function getChatsList() {
		const res = await ChatService.getChatList();
		setChatsList(res.data);
	}

	useEffect(() => {
		getChatsList().catch((e) => console.log(e));
	}, []);

	const handleSearch = (value: string) => {
		searchFriendsOrChatsList({ value, type: 'chats', getList: getChatsList, setState: setChatsList });
	};

	return (
		<div className="chatListPanel">
			<div className="chats-row">
				<h3>Chats</h3>

				<div className="chats-manage-btn" onClick={() => setIsModalShown(true)}>
					<img src={plus} alt="plus" />
				</div>

				<ModalOverlay isOpen={isModalShown} onClose={() => setIsModalShown(false)}>
					<NewChat onClose={() => setIsModalShown(false)} />
				</ModalOverlay>
			</div>

			<SearchInput onChange={handleSearch} />

			<ChatList chatsList={chatsList} />
		</div>
	);
};
