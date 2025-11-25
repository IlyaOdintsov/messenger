import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Group } from '../../types/chats_Types';
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
	reducers: {},
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

export default ChatSlice.reducer;
