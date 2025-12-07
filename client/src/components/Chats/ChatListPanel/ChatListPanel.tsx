import { SearchInput } from '../../../shared';
import { ChatList } from './ChatList/ChatList';
import './styles.scss';
import plus from '../../../assets/plus.svg';
import { ModalOverlay } from '../../../shared/ModalOverlay/ModalOverlay';
import { NewChat } from './NewChat/NewChat';
import { useEffect, useState } from 'react';
import { searchFriendsOrChatsList } from '../../../features/searchFriendsOrChatsList.ts';
import type { Group } from '../../../types/chats_Types.ts';
import { useTypedSelector } from '../../../hooks/useAppSelector.ts';

export const ChatListPanel = () => {
	const [isModalShown, setIsModalShown] = useState(false);
	const [searchedChats, setSearchedChats] = useState<Group[] | null>(null);
	const [searchValue, setSearchValue] = useState('');

	const chatsList = useTypedSelector((state) => state.chats.groupData);

	const handleSearch = (value: string) => {
		setSearchValue(value);
	};

	useEffect(() => {
		searchFriendsOrChatsList({ value: searchValue, type: 'chats', setState: setSearchedChats });
	}, [searchValue, chatsList]);

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

			<ChatList searchedChats={searchedChats} />
		</div>
	);
};
