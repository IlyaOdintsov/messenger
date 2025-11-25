import './styles/main.scss';
import AppRouter from './routes/AppRouter';
import io from 'socket.io-client';
import { SERVER_URL } from './constants/constants.ts';
import { useEffect } from 'react';
import { useTypedSelector } from './hooks/useAppSelector.ts';
import { useAppDispatch } from './hooks/useAppDispatch.ts';
import { getChatList } from './store/slices/ChatSlice.ts';

export const socket = io(SERVER_URL, { autoConnect: true });

function App() {
	const userId = useTypedSelector((state) => state.auth.data?.user.id);
	const groups = useTypedSelector((state) => state.chats.groupData);

	const dispatch = useAppDispatch();

	useEffect(() => {
		console.log(groups);
	}, [groups]);

	useEffect(() => {
		dispatch(getChatList());
	}, [userId]);

	useEffect(() => {
		if (!userId) return;
		socket.emit('join_user_room', userId);

		groups.forEach((group) => {
			socket.emit('join_group_room', group.id);
		});

		return () => {
			socket.emit('leave_user_room', userId);

			groups.forEach((group) => {
				socket.emit('leave_groups_room', group.id);
			});
		};
	}, [groups, userId]);

	return <AppRouter />;
}

export default App;
