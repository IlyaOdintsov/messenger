import { ChatList } from './ChatList/ChatList.tsx';
import './styles.scss';
import plus from '@/FSD_shared/assets/icons/plus.svg';
import { NewChat } from './NewChat/NewChat.tsx';
import { useEffect, useState } from 'react';
import { Group } from '@/FSD_shared/types/chats_Types.ts';
import { useTypedSelector } from '@/FSD_shared/lib/hooks/useAppSelector.ts';
import { searchFriendsOrChatsList } from '@/FSD_shared/lib/searchFriendsOrChatsList.ts';
import { ModalOverlay, SearchInput } from '@/FSD_shared/ui';

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
