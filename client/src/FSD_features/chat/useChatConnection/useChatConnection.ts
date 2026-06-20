import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentChat } from '@/FSD_shared/store/slices/ChatSlice.ts';
import { socket } from '@/FSD_app/App.tsx';

export const ChatManager = () => {
	const { chatId } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		if (chatId) {
			dispatch(setCurrentChat(chatId));
		} else {
			dispatch(setCurrentChat(null));
		}
	}, [chatId, dispatch]);

	useEffect(() => {
		if (!chatId) return;

		socket.emit('join_chat', chatId);

		return () => {
			socket.emit('leave_chat', chatId);
		};
	}, [chatId]);

	return null;
};
