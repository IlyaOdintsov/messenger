import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/AuthSlice';
import chatReducer from './slices/ChatSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		chats: chatReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
