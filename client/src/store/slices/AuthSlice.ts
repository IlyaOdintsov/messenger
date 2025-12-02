import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';
import type { AuthResponse } from '../../types/Auth_Response';
import { LS_ACCESS_TOKEN } from '../../constants/constants';
import $api, { API_URL } from '../../http';
import ContactsService from '../../services/ContactsService.tsx';

export interface AuthState {
	status: string;
	data: null | AuthResponse;
	error: null | string;
	isAuth: boolean;
}

const initialState: AuthState = {
	status: '',
	data: null,
	error: null,
	isAuth: false,
};

function saveToLs(token: string) {
	localStorage.setItem(LS_ACCESS_TOKEN, token);
}
function removeFromLs() {
	localStorage.removeItem(LS_ACCESS_TOKEN);
}

const authSLice = createSlice({
	name: 'authorization',
	initialState,
	reducers: {
		resetState(state) {
			state.status = '';
			state.data = null;
			state.error = null;
			state.isAuth = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.data = action.payload;
				saveToLs(state.data.accessToken);
				state.isAuth = true;
			})
			.addCase(login.rejected, (state, action) => {
				state.status = 'failed';
				state.data = null;
				state.error = action.payload || 'Ошибка авторизации';
			})

			.addCase(checkAuth.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.data = action.payload;
				saveToLs(state.data.accessToken);
				state.isAuth = true;
			})
			.addCase(checkAuth.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload || 'Ошибка обновления токена';
				removeFromLs();
				state.data = null;
				state.isAuth = false;
			})

			.addCase(registration.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(registration.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.data = action.payload;
				saveToLs(state.data.accessToken);
				state.isAuth = true;
			})
			.addCase(registration.rejected, (state, action) => {
				state.status = 'failed';
				state.data = null;
				state.error = action.payload || 'Ошибка регистрации';
			})

			.addCase(logout.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.status = 'succeeded';
				state.data = null;
				state.error = null;
				state.isAuth = false;
			})
			.addCase(logout.rejected, (state, action) => {
				state.status = 'failed';
				state.data = null;
				state.error = action.error.message || 'Неизвестная ошибка';
			})

			.addCase(addFriend.fulfilled, (state, action) => {
				state.data?.user.friends.push(action.payload);
			})

			.addCase(deleteFriend.fulfilled, (state, action) => {
				state.data?.user.friends.filter((friend) => friend !== action.payload);
			});
	},
});

export const login = createAsyncThunk<AuthResponse, { email: string; password: string; rememberMe: boolean }, { rejectValue: string }>(
	'authorization/login',
	async ({ email, password, rememberMe }, thunkAPI) => {
		try {
			const response = await AuthService.login(email, password, rememberMe);
			return response.data;
		} catch (e: any) {
			return thunkAPI.rejectWithValue(e.response.data.message || 'Ошибка проверки');
		}
	}
);

export const checkAuth = createAsyncThunk<AuthResponse, void, { rejectValue: string }>('authorization/checkAuth', async (_, thunkAPI) => {
	try {
		const response = await $api.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
		return response.data;
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e.response.data.message || 'Ошибка проверки');
	}
});

export const registration = createAsyncThunk<AuthResponse, { formData: FormData }, { rejectValue: string }>(
	'authorization/registration',
	async ({ formData }, thunkAPI) => {
		try {
			const response = await AuthService.registration(formData);
			return response.data;
		} catch (e: any) {
			return thunkAPI.rejectWithValue(e.response.data.message || 'Ошибка проверки');
		}
	}
);

export const logout = createAsyncThunk<void, void, { rejectValue: string }>('authorization/logout', async (_, thunkAPI) => {
	try {
		await AuthService.logout();
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e.response.data.message || 'Ошибка проверки');
	}
});

export const addFriend = createAsyncThunk<string, string, { rejectValue: string }>('authorization/addFriend', async (contactId, thunkAPI) => {
	try {
		const response = await ContactsService.addContact(contactId);
		return response.data;
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e.response.data.message || 'Ошибка проверки');
	}
});

export const deleteFriend = createAsyncThunk<string, { contactId: string }, { rejectValue: string }>('authorization/deleteFriend', async ({ contactId }, thunkAPI) => {
	try {
		const response = await ContactsService.deleteContact(contactId);
		return response.data;
	} catch (e: any) {
		return thunkAPI.rejectWithValue(e.response.data.message || 'Ошибка проверки');
	}
});

export const { resetState } = authSLice.actions;
export default authSLice.reducer;
