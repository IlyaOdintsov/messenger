import type { Group } from '../../../../types/chats_Types';
import './styles.scss';
import menuIcon from '../../../../assets/menu.svg';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { deleteGroup } from '../../../../store/slices/ChatSlice';
import { useNavigate } from 'react-router-dom';

interface ChatHeader {
	currentChat: Group | null;
}

export const ChatHeader = ({ currentChat }: ChatHeader) => {
	const avatarUrl = currentChat?.avatarUrl;
	const chatName = currentChat?.chatName;
	const membersCount = currentChat?.members.length;
	const groupId = currentChat?.id;

	const menuRef = useRef<HTMLDivElement>(null);

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	function handleDelete() {
		if (!groupId) return;
		dispatch(deleteGroup({ groupId }));
		navigate('/chats', { replace: true });
	}

	useEffect(() => {
		function handleCloseMenu (e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setIsMenuOpen(false);
			}
		}

		if(isMenuOpen) {
			document.addEventListener('click', handleCloseMenu);
		} else {
			document.removeEventListener('click', handleCloseMenu);
		}

		return () => {
			document.removeEventListener('click', handleCloseMenu);
		}
	}, [isMenuOpen]);

	return (
		<div className="chat-header">
			<div className="avatarWrapper">{avatarUrl ? <img src={avatarUrl} alt="groupAvatar" /> : <h1>{chatName?.[0].toUpperCase()}</h1>}</div>

			<div className="infoWrapper">
				<h3>{chatName}</h3>
				<p>{membersCount} members</p>
			</div>

			<div ref={menuRef} className="buttonsWrapper">
				<button
					onClick={(e) => {
						e.stopPropagation();
						setIsMenuOpen((prev) => !prev);
					}}
					className={`menuBtn ${isMenuOpen ? 'menuBtn_active' : ''}`}
				>
					<img src={menuIcon} alt="menu" />
				</button>

				<div className={`groupMenu${isMenuOpen ? ' groupMenu_active' : ''}`} onClick={(e) => e.stopPropagation()}>
					<button className="defaultBtn">редактировать</button>
					<button onClick={handleDelete} className="defaultBtn">
						Удалить чат
					</button>
				</div>
			</div>
		</div>
	);
};
