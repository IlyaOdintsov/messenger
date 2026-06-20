import './styles.scss';
import { Group } from '@/FSD_shared/types/chats_Types.ts';
import { useTypedSelector } from '@/FSD_shared/lib/hooks/useTypedSelector.ts';
import { ScrollBar } from '@/FSD_shared/ui';
import { ChatBlock } from '@/FSD_entities/chat/ui/ChatBlock/ChatBlock.tsx';
import emptyChatListIcon from '@/FSD_shared/assets/icons/emptyChatList.svg';

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

	return (
		<ScrollBar dependencies={chats} className={`w-full h-full flex flex-col flex-center gap-4 chatsList${chats.length <= 0 ? ' empty' : ''}`}>
			{chats.length <= 0 && (
				<>
					<img src={emptyChatListIcon} alt="emptyChat" className="avatar-xxl" />
					<h4>No Conversations Yet</h4>
					<p className="text-secondary">Start a new chat or invite others to join the conversation.</p>
				</>
			)}

			{chats.map((chat) => (
				<ChatBlock key={chat.id} {...chat} />
			))}
		</ScrollBar>
	);
};
