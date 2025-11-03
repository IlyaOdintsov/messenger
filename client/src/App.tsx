import './styles/main.scss';
import AppRouter from './routes/AppRouter';
import io from 'socket.io-client';
import { SERVER_URL } from './constants/constants.ts';
import { useEffect } from 'react';
import { useTypedSelector } from './hooks/useAppSelector.ts';
import { useAppDispatch } from './hooks/useAppDispatch.ts';
import { createNewGroup, deleteGroupById, getGroupList } from './store/slices/ChatSlice.ts';

export const socket = io(SERVER_URL, { autoConnect: true });

function App() {
	const userId = useTypedSelector((state) => state.auth.data?.user.id);
	const groups = useTypedSelector((state) => state.chats.groupData);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!userId) return;
		dispatch(getGroupList({ userId }));
	}, [userId]);

	useEffect(() => {
		if (!userId) return;
		socket.emit('join_user_room', userId);

		groups.forEach((group) => {
			socket.emit('join_group_room', group.id);
		});

		socket.on('create_group', (group) => {
			dispatch(createNewGroup(group));
			socket.emit('join_group_room', group.id);
		});

		socket.on('delete_group', (groupId) => {
			console.log(groupId);

			dispatch(deleteGroupById(groupId));
			socket.emit('leave_group_room', groupId);
		});

		return () => {
			socket.emit('leave_user_room', userId);

			groups.forEach((group) => {
				socket.emit('leave_groups_room', group.id);
			});
			socket.off('create_group');
			socket.off('delete_group');
		};
	}, [groups, userId]);

	return <AppRouter />;
}

export default App;
