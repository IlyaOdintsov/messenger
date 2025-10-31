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
			.addCase(createGroup.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(createGroup.fulfilled, (state, action) => {
				state.status = 'succeeded';
				// state.groupData = action.payload;
			})
			.addCase(createGroup.rejected, (state, action) => {
				state.status = 'failed';
				state.groupData = [];
				state.error = action.payload || 'Ошибка создания группы';
			})

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

export const createGroup = createAsyncThunk<Group, { formData: FormData }, { rejectValue: string }>('chats/createGroup', async ({ formData }, thunkAPI) => {
	try {
		const response = await ChatService.creategroup(formData);
		return response.data;
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e.response.data.message || 'Ошибка проверки');
	}
});

export const getGroupList = createAsyncThunk<Group[], { userId: string }, { rejectValue: string }>('chats/getGroupList', async ({ userId }, thunkAPI) => {
	try {
		const response = await ChatService.getGroupList(userId);
		return response.data;
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e.response.data.message || 'Ошибка');
	}
});

export default ChatSlice.reducer;
