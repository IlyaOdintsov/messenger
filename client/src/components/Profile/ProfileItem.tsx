import './styles.scss';
import profileIcon from '../../assets/camera.svg';
import { addFriend, logout } from '../../store/slices/AuthSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch.ts';
import type { IUser } from '../../types/Auth_Response.ts';
import { useTypedSelector } from '../../hooks/useAppSelector.ts';
import { useEffect, useState } from 'react';
import plus from '../../assets/plus.svg';
import check from '../../assets/check.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { createChat } from '../../store/slices/ChatSlice.ts';
import { unwrapResult } from '@reduxjs/toolkit';

interface ProfileItemProps {
	user: IUser;
}

export const ProfileItem = ({ user }: ProfileItemProps) => {
	const groups = useTypedSelector((state) => state.chats.groupData);
	const [isAlreadyFriend, setIsAlreadyFriend] = useState(false);
	console.log('profileItem id:', user.id);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const isMyProfilePage = location.pathname === '/profile';

	const avatar = user.avatarUrl;
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
		<div className="profileItem">
			<div className="profile-header">
				<h4>{isMyProfilePage ? 'My profile' : 'Profile'}</h4>

				{!isMyProfilePage && (
					<div className="add-friend-btn" onClick={handleAddFriend} style={isAlreadyFriend ? { pointerEvents: 'none' } : {}}>
						{isAlreadyFriend ? <img src={check} alt="check" /> : <img src={plus} alt="plus" />}
					</div>
				)}
			</div>

			<div className="avatar-wrapper">
				<img src={avatar ? avatar : profileIcon} alt="profile" style={{ padding: avatar ? '' : '12px' }} />
			</div>

			<div className="row">
				<span>{nickName}</span>
			</div>

			<div className="row">{email}</div>

			{isMyProfilePage ? (
				<button className="defaultBtn" onClick={handleLogout}>
					Log out
				</button>
			) : (
				<button className="defaultBtn" onClick={handleWrite}>
					Написать
				</button>
			)}
		</div>
	);
};
