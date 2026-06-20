import './styles.scss';
import { addFriend, logout } from '@/FSD_shared/store/slices/AuthSlice.ts';
import { useAppDispatch } from '@/FSD_shared/lib/hooks/useAppDispatch.ts';
import type { IUser } from '@/FSD_shared/types/Auth_Response.ts';
import { useTypedSelector } from '@/FSD_shared/lib/hooks/useTypedSelector.ts';
import { useEffect, useState } from 'react';
import plus from '@/FSD_shared/assets/icons/plus.svg';
import check from '@/FSD_shared/assets/icons/check.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { createChat } from '@/FSD_shared/store/slices/ChatSlice.ts';
import { unwrapResult } from '@reduxjs/toolkit';
import { Avatar } from '@/FSD_shared/ui/Avatar/Avatar.tsx';

interface ProfileItemProps {
	user: IUser;
	className?: string;
}

export const ProfileItem = ({ user, className }: ProfileItemProps) => {
	const groups = useTypedSelector((state) => state.chats.groupData);
	const [isAlreadyFriend, setIsAlreadyFriend] = useState(false);
	console.log('profileItem id:', user.id);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const isMyProfilePage = location.pathname === '/profile';

	const avatarUrl = user.avatarUrl;
	const nickName = `${user.firstName} ${user.secondName || ''}`.trim();
	const email = user.email;
	const userId = user.id;

	const userFriends = useTypedSelector((state) => state.auth.data?.user.friends) || [];

	function handleAddFriend() {
		dispatch(addFriend(userId));
		setIsAlreadyFriend(true);
	}

	function handleLogout() {
		dispatch(logout());
	}

	async function handleWrite() {
		const currChat = groups.find((group) => group.members.find((member) => member.userId === userId));

		if (currChat) {
			navigate(`/chats/${currChat.id}`);
			return;
		}

		const data = new FormData();

		data.append('type', 'private');
		data.append('privateMemberId', userId);

		const newPrivateChat = await dispatch(createChat({ formData: data }));

		navigate(`/chats/${unwrapResult(newPrivateChat).id}`);
	}

	useEffect(() => {
		setIsAlreadyFriend(false);
		if (userFriends.includes(userId)) {
			setIsAlreadyFriend(true);
		}
	}, [userId]);

	return (
		<div className={`container max-w-50 gap-6 h-full profileItem ${className}`}>
			<div className="flex flex-col gap-6 w-full flex-center">
				<div className="w-full flex flex-align-center justify-between">
					<h3>{isMyProfilePage ? 'My profile' : 'Profile'}</h3>

					{!isMyProfilePage && (
						<div className="add-friend-btn" onClick={handleAddFriend} style={isAlreadyFriend ? { pointerEvents: 'none' } : {}}>
							{isAlreadyFriend ? <img src={check} alt="check" /> : <img src={plus} alt="plus" />}
						</div>
					)}
				</div>

				<Avatar avatarUrl={avatarUrl} firstName={nickName} size="xxl" />

				<div className="flex flex-col flex-align-center gap-2">
					<span>{nickName}</span>
					<span>{email}</span>
				</div>
			</div>

			{isMyProfilePage ? (
				<button className="btn btn-primary btn-lg" onClick={handleLogout}>
					Log out
				</button>
			) : (
				<button className="btn btn-primary btn-lg w-full" onClick={handleWrite}>
					Написать
				</button>
			)}
		</div>
	);
};
