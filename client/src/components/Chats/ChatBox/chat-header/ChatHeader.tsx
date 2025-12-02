import type { Group } from '../../../../types/chats_Types';
import './styles.scss';
import menuIcon from '../../../../assets/menu.svg';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { deleteGroup } from '../../../../store/slices/ChatSlice';
import { useNavigate } from 'react-router-dom';
import { ModalOverlay } from '../../../../shared/ModalOverlay/ModalOverlay.tsx';
import { EditChat } from '../EditChat/EditChat.tsx';
import { deleteFriend } from '../../../../store/slices/AuthSlice.ts';

interface ChatHeader {
	currentChat: Group | null;
}

export const ChatHeader = ({ currentChat }: ChatHeader) => {
	const avatarUrl = currentChat?.avatarUrl;
	const chatName = currentChat?.chatName;
	const membersCount = currentChat?.members.length;
	const chatId = currentChat?.id;
	const type = currentChat?.type;

	const menuRef = useRef<HTMLDivElement>(null);
	const [isModalShown, setIsModalShown] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	function handleDelete() {
		if (!chatId) return;
		type === 'group' ? dispatch(deleteGroup({ groupId: chatId })) : dispatch(deleteFriend({ contactId: chatId }));
		navigate('/chats', { replace: true });
	}

	useEffect(() => {
		function handleCloseMenu(e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setIsMenuOpen(false);
			}
		}

		if (isMenuOpen) {
			document.addEventListener('click', handleCloseMenu);
		} else {
			document.removeEventListener('click', handleCloseMenu);
		}

		return () => {
			document.removeEventListener('click', handleCloseMenu);
		};
	}, [isMenuOpen]);

	return (
		<>
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
						{type === 'group' ? (
							<>
								<button
									onClick={() => {
										setIsModalShown(true);
										setIsMenuOpen(false);
									}}
									className="defaultBtn"
								>
									Редактировать
								</button>
								<button onClick={handleDelete} className="defaultBtn">
									Удалить чат
								</button>
							</>
						) : (
							<>
								<button onClick={handleDelete} className="defaultBtn">
									Удалить
								</button>
							</>
						)}
					</div>
				</div>
			</div>

			<ModalOverlay isOpen={isModalShown} onClose={() => setIsModalShown(false)}>
				<EditChat currentChat={currentChat} onClose={() => setIsModalShown(false)} />
			</ModalOverlay>
		</>
	);
};
