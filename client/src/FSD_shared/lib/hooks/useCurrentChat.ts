import { useSelector, useDispatch } from 'react-redux';
import {
	selectCurrentChat,
	selectCurrentChatId,
	selectCurrentChatName,
	selectCurrentChatAvatar,
	selectCurrentChatMembers,
	selectCurrentChatMembersCount,
	selectCurrentChatType,
} from '@/FSD_shared/store/Selectors/chatSelectors.ts';
import { updateCurrentChat } from '@/FSD_shared/store/slices/ChatSlice.ts';
import { Group } from '@/FSD_shared/types/chats_Types.ts';

export const useCurrentChat = () => {
	const dispatch = useDispatch();
	const currentChat = useSelector(selectCurrentChat);
	const id = useSelector(selectCurrentChatId);
	const name = useSelector(selectCurrentChatName);
	const avatar = useSelector(selectCurrentChatAvatar);
	const members = useSelector(selectCurrentChatMembers);
	const membersCount = useSelector(selectCurrentChatMembersCount);
	const type = useSelector(selectCurrentChatType);

	const updateChat = (updates: Partial<Group>) => {
		dispatch(updateCurrentChat(updates));
	};

	return {
		currentChat,
		id,
		name,
		avatar,
		members,
		membersCount,
		type,
		updateChat,
		isGroup: type === 'group',
		isPrivate: type === 'private',
	};
};
