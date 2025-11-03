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
	reducers: {
		createNewGroup(state, action) {
			state.groupData.push(action.payload);
		},
		deleteGroupById(state, action) {
			state.groupData = state.groupData.filter((group) => group.id !== action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getGroupList.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(getGroupList.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.groupData = action.payload;
			})
			.addCase(getGroupList.rejected, (state, action) => {
				state.status = 'failed';
				state.groupData = [];
				state.error = action.payload || 'Ошибка получении групп';
			});
	},
});

export const getGroupList = createAsyncThunk<Group[], { userId: string }, { rejectValue: string }>('chats/getGroupList', async ({ userId }, thunkAPI) => {
	try {
		const response = await ChatService.getGroupList(userId);
		return response.data;
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e.response.data.message || 'Ошибка получения списка чатов');
	}
});

export const createGroup = createAsyncThunk<void, { formData: FormData }, { rejectValue: string }>('chats/createGroup', async ({ formData }, thunkAPI) => {
	try {
		await ChatService.creategroup(formData);
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e.response.data.message || 'Ошибка создания группы');
	}
});

export const deleteGroup = createAsyncThunk<void, { groupId: string }, { rejectValue: string }>('chats/deleteGroup', async ({ groupId }, thunkAPI) => {
	try {
		await ChatService.deleteGroup(groupId);
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e.response.data.message || 'Ошибка удаления группы');
	}
});

export const { createNewGroup, deleteGroupById } = ChatSlice.actions;
export default ChatSlice.reducer;
