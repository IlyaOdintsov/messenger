import './styles.scss';
import { useState } from 'react';
import { useTypedSelector } from '@/FSD_shared/lib/hooks/useAppSelector.ts';
import { useAppDispatch } from '@/FSD_shared/lib/hooks/useAppDispatch.ts';
import { createChat } from '@/FSD_shared/store/slices/ChatSlice.ts';
import { AvatarInput, FormInput } from '@/FSD_shared/ui';

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

		if (groupName.length < 2) {
			setError('Название группы не может быть меньше 2 символов');
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
