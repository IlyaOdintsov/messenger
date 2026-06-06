import './styles/main.scss';
import AppRouter from './routes/AppRouter.tsx';
import io from 'socket.io-client';
import { useEffect } from 'react';
import { SERVER_URL } from '@/FSD_shared/config/constants.ts';
import { useTypedSelector } from '@/FSD_shared/lib/hooks/useAppSelector.ts';
import { useAppDispatch } from '@/FSD_shared/lib/hooks/useAppDispatch.ts';
import { getChatList } from '@/FSD_shared/store/slices/ChatSlice.ts';

export const socket = io(SERVER_URL, { autoConnect: true });

function App() {
	const userId = useTypedSelector((state) => state.auth.data?.user.id);
	const groups = useTypedSelector((state) => state.chats.groupData);

	const dispatch = useAppDispatch();

	useEffect(() => {
		console.log(groups);
	}, [groups]);

	useEffect(() => {
		if (!userId) return;
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
