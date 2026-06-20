import { ChatList } from '@/FSD_widgets/ChatListPanel/ui/ChatList/ChatList.tsx';
import './styles.scss';
import plus from '@/FSD_shared/assets/icons/plus.svg';
import { NewChat } from '@/FSD_widgets/ChatListPanel/ui/NewChat/NewChat.tsx';
import { useEffect, useState } from 'react';
import { Group } from '@/FSD_shared/types/chats_Types.ts';
import { useTypedSelector } from '@/FSD_shared/lib/hooks/useTypedSelector.ts';
import { searchFriendsOrChatsList } from '@/FSD_shared/lib/searchFriendsOrChatsList.ts';
import { SearchInput } from '@/FSD_shared/ui';
import { ActionButton } from '@/FSD_shared/ui/ButtonAction/ButtonAction.tsx';

export const ChatListPanel = () => {
	const [searchedChats, setSearchedChats] = useState<Group[] | null>(null);
	const [searchValue, setSearchValue] = useState('');

	const chatsList = useTypedSelector((state) => state.chats.groupData);

	const handleSearch = (value: string) => {
		setSearchValue(value);
	};

	useEffect(() => {
		searchFriendsOrChatsList({ value: searchValue, type: 'chats', setState: setSearchedChats });
	}, [searchValue, chatsList]);

	const modal = <NewChat />;

	return (
		<div className="container chatsListPanel">
			<div className="flex gap-2 justify-between w-full items-center">
				<h3>Chats</h3>

				<ActionButton icon={plus} iconVariant="accent" modal={modal} />
			</div>

			<SearchInput onChange={handleSearch} />

			<ChatList searchedChats={searchedChats} />
		</div>
	);
};
