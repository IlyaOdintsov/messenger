import './styles.scss';
import { AvatarInput, FormInput } from '../../../../shared';
import { useState } from 'react';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { editChat } from '../../../../store/slices/ChatSlice';
import type { Group } from '../../../../types/chats_Types.ts';

type TEditChat = {
	currentChat: Group | null;
	onClose: () => void;
};

export const EditChat = ({ currentChat, onClose }: TEditChat) => {
	const [groupAvatarInput, setGroupAvatarInput] = useState<File | string | null>(currentChat?.avatarUrl || '');
	const [groupName, setGroupName] = useState(currentChat?.chatName || '');
	const [error, setError] = useState('');

	const dispatch = useAppDispatch();

	// function handleCreation() {
	// 	if (!userId) {
	// 		setError('Необходимо авторизоваться');
	// 		return;
	// 	}
	//
	// 	if (!groupName) {
	// 		setError('Введите название группы');
	// 		return;
	// 	}
	//
	// 	const data = new FormData();
	//
	// 	data.append('type', 'group');
	// 	if (groupAvatarInput) data.append('avatar', groupAvatarInput);
	// 	data.append('groupName', groupName);
	//
	// 	try {
	// 		dispatch(createChat({ formData: data }));
	// 		onClose();
	// 	} catch (e: any) {
	// 		setError(e);
	// 	}
	// }

	function handleEdit() {
		if (!groupName) {
			setError('Введите название группы');
			return;
		}

		const data = new FormData();

		if (groupAvatarInput) data.append('avatar', groupAvatarInput);
		data.append('chatName', groupName);

		try {
			if (currentChat?.id) {
				console.log('formData ava', data.getAll('avatar'));
				console.log('formData name', data.getAll('groupName'));

				dispatch(editChat({ chatId: currentChat.id, formData: data }));
				onClose();
			}
		} catch (e: any) {
			setError(e);
		}
	}

	return (
		<div className="editChat">
			<div className="row">
				<h4>Редактировать группу</h4>
			</div>

			<div className="row">
				<AvatarInput onChange={setGroupAvatarInput} name={groupName} value={groupAvatarInput} />
				<div className="inputWrapper">
					Название группы
					<FormInput
						callback={(e) => {
							setError('');
							setGroupName(e);
						}}
						inputValue={groupName}
						inputName="groupName"
						autoFocus
					/>
				</div>
			</div>

			{error && <div className="error">{error}</div>}

			<div className="row">
				<button className="defaultBtn" onClick={onClose}>
					Отмена
				</button>
				<button className="defaultBtn" onClick={handleEdit}>
					Сохранить
				</button>
			</div>
		</div>
	);
};
