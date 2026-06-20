import { RootState } from '@/FSD_shared/store/store.tsx';
import { createSelector } from '@reduxjs/toolkit';

export const selectGroupData = (state: RootState) => state.chats.groupData;
export const selectCurrentChat = (state: RootState) => state.chats.currentChat;
export const selectChatsStatus = (state: RootState) => state.chats.status;
export const selectChatsError = (state: RootState) => state.chats.error;

export const selectCurrentChatId = (state: RootState) => state.chats.currentChat?.id;
export const selectCurrentChatName = (state: RootState) => state.chats.currentChat?.chatName;
export const selectCurrentChatAvatar = (state: RootState) => state.chats.currentChat?.avatarUrl;
export const selectCurrentChatType = (state: RootState) => state.chats.currentChat?.type;

export const selectCurrentChatMembers = createSelector(
	[selectCurrentChat],
	(currentChat) => currentChat?.members ?? null // Возвращаем null вместо []
);
export const selectCurrentChatMembersCount = createSelector([selectCurrentChatMembers], (members) => members?.length ?? null);
