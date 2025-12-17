import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Group, Message } from '../../types/chats_Types';
import ChatService from '../../services/ChatService';

interface GroupState {
	status: string;
	error: null | string;
	groupData: Group[];
}

const initialState: GroupState = {
	status: '',
	error: null,
	groupData: [],
};

const ChatSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {
		updateChatLastMessage(state, action: PayloadAction<Message>) {
			const { chatId } = action.payload;
			const newMessage = action.payload;

			state.groupData = state.groupData.map((chat) => (chat.id === chatId ? { ...chat, lastMessage: newMessage } : chat));
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getChatList.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(getChatList.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.groupData = action.payload;
			})
			.addCase(getChatList.rejected, (state, action) => {
				state.status = 'failed';
				state.groupData = [];
				state.error = action.payload || 'Ошибка получения групп';
			})
			.addCase(createChat.fulfilled, (state, action) => {
				state.groupData = [...state.groupData, action.payload];
			})
			.addCase(deleteGroup.fulfilled, (state, action) => {
				state.groupData = state.groupData.filter((group) => group.id !== action.payload);
			})
			.addCase(editChat.fulfilled, (state, action) => {
				state.groupData = state.groupData.map((group) => (group.id === action.payload.id ? action.payload : group));
			})
			.addCase(addMemberToGroup.fulfilled, (state, action) => {
				state.groupData = state.groupData.map((group) => (group.id === action.payload.id ? action.payload : group));
			});
	},
});

export const getChatList = createAsyncThunk<Group[], void, { rejectValue: string }>('chats/getChatList', async (_, thunkAPI) => {
	try {
		const response = await ChatService.getChatList();
		return response.data;
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e.response.data.message || 'Ошибка получения списка чатов');
	}
});

export const createChat = createAsyncThunk<Group, { formData: FormData }, { rejectValue: string }>('chats/createGroup', async ({ formData }, thunkAPI) => {
	try {
		const response = await ChatService.createChat(formData);
		return response.data;
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e.response.data.message || 'Ошибка создания группы');
	}
});

export const deleteGroup = createAsyncThunk<string, { groupId: string }, { rejectValue: string }>('chats/deleteGroup', async ({ groupId }, thunkAPI) => {
	try {
		const response = await ChatService.deleteGroup(groupId);
		return response.data;
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e.response.data.message || 'Ошибка удаления группы');
	}
});

export const editChat = createAsyncThunk<Group, { chatId: string; formData: FormData }, { rejectValue: string }>(
	'chats/editChat',
	async ({ chatId, formData }, thunkAPI) => {
		try {
			const response = await ChatService.editChat(chatId, formData);
			return response.data;
		} catch (e: any) {
			return thunkAPI.rejectWithValue(e.response.data.message || 'Ошибка редактирования группы');
		}
	}
);

export const addMemberToGroup = createAsyncThunk<Group, { groupId: string; contactId: string }, { rejectValue: string }>(
	'chats/addMemberToGroup',
	async ({ groupId, contactId }, thunkAPI) => {
		try {
			const response = await ChatService.addMemberToGroup(groupId, contactId);
			return response.data;
		} catch (e: any) {
			return thunkAPI.rejectWithValue(e.response.data.message || 'Ошибка создания группы');
		}
	}
);

export const { updateChatLastMessage } = ChatSlice.actions;
export default ChatSlice.reducer;
