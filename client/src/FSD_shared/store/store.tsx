import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/FSD_shared/store/slices/AuthSlice.ts';
import chatReducer from '@/FSD_shared/store/slices/ChatSlice.ts';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		chats: chatReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
