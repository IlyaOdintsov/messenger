import type { Group } from '../../../../types/chats_Types';
import './styles.scss';
import menuIcon from '../../../../assets/menu.svg';
import { useState } from 'react';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { deleteGroup } from '../../../../store/slices/ChatSlice';
import { useNavigate } from 'react-router-dom';

interface ChatHeader {
	currentChat: Group | null;
}

export const ChatHeader = ({ currentChat }: ChatHeader) => {
	const avatarUrl = currentChat?.avatarUrl;
	const groupName = currentChat?.groupName;
	const membersCount = currentChat?.members.length;
	const groupId = currentChat?.id;

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	function handleDelete() {
		if (!groupId) return;
		dispatch(deleteGroup({ groupId }));
		navigate('/chats', { replace: true });
	}

	return (
		<div className="chat-header" onClick={() => setIsMenuOpen(false)}>
			<div className="avatarWrapper">{avatarUrl ? <img src={avatarUrl} alt="groupAvatar" /> : <h1>{groupName?.[0].toUpperCase()}</h1>}</div>

			<div className="infoWrapper">
				<h3>{groupName}</h3>
				<p>{membersCount}</p>
			</div>

			<div className="buttonsWrapper">
				<button
					onClick={(e) => {
						e.stopPropagation();
						setIsMenuOpen((prev) => !prev);
					}}
					className={`menuBtn ${isMenuOpen ? 'menuBtn_active' : ''}`}
				>
					<img src={menuIcon} alt="menu" />
				</button>

				<div className={`groupMenu ${isMenuOpen ? 'groupMenu_active' : ''}`} onClick={(e) => e.stopPropagation()}>
					<button className="defaultBtn">редактировать</button>
					<button onClick={handleDelete} className="defaultBtn">
						Удалить чат
					</button>
				</div>
			</div>
		</div>
	);
};
