import './styles.scss';
import { useTypedSelector } from '../../hooks/useAppSelector';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { logout } from '../../store/slices/AuthSlice';

export const ProfilePage = () => {
	const user = useTypedSelector((state) => state.auth.data?.user);

	const dispatch = useAppDispatch();

	if (!user) return;
	console.log(user);

	const avatar = user.avatarUrl;
	const nickName = `${user.firstName} ${user.secondName || ''}`.trim();
	const email = user.email;

	function handleLogout() {
		dispatch(logout());
	}

	return (
		<div className="container">
			<div className="profilePage">
				<div className="profile-header">
					<h4>Мой профиль</h4>
				</div>

				<div className="avatar-wrapper">
					<img src={`http://localhost:5000${avatar}`} alt="avatar" className="avatar-img" />
				</div>

				<div className="row">
					<span>{nickName}</span>
				</div>

				<div className="row">{email}</div>

				<button className="defaultBtn" onClick={handleLogout}>
					Log out
				</button>
			</div>
		</div>
	);
};
