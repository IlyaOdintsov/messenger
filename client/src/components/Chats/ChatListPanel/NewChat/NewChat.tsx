import './styles.scss';
import { AvatarInput, FormInput } from '../../../../shared';
import { useState } from 'react';
import { useTypedSelector } from '../../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { createChat } from '../../../../store/slices/ChatSlice';

export const NewChat = ({ onClose }: { onClose: () => void }) => {
	const [groupAvatarInput, setGroupAvatarInput] = useState<File | null>(null);
	const [groupName, setGroupName] = useState('');
	const [error, setError] = useState('');

	const userId = useTypedSelector((state) => state.auth.data?.user.id);

	const dispatch = useAppDispatch();

	function handleCreation() {
		if (!userId) {
			setError('Необходимо авторизоваться');
			return;
		}

		if (!groupName) {
			setError('Введите название группы');
			return;
		}

		const data = new FormData();

		data.append('type', 'group');
		if (groupAvatarInput) data.append('avatar', groupAvatarInput);
		data.append('groupName', groupName);

		try {
			dispatch(createChat({ formData: data }));
			onClose();
		} catch (e: any) {
			setError(e);
		}
	}

	return (
		<div className="newChat">
			<div className="row">
				<h4>Новая группа</h4>
			</div>

			<div className="row">
				<AvatarInput onChange={setGroupAvatarInput} value={groupAvatarInput} />
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
				<button className="defaultBtn" onClick={handleCreation}>
					Далее
				</button>
			</div>
		</div>
	);
};
