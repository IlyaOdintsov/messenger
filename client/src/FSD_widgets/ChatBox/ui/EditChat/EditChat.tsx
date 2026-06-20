import './styles.scss';
import { useState } from 'react';
import { useAppDispatch } from '@/FSD_shared/lib/hooks/useAppDispatch.ts';
import { editChat } from '@/FSD_shared/store/slices/ChatSlice.ts';
import { AvatarInput, FormInput } from '@/FSD_shared/ui';
import { useCurrentChat } from '@/FSD_shared/lib/hooks/useCurrentChat.ts';
import { Button } from '@/FSD_shared/ui/Button/Button.tsx';

type TEditChat = {
	onClose?: () => void;
};

export const EditChat = ({ onClose }: TEditChat) => {
	const { id, avatar, name } = useCurrentChat();

	const [groupAvatarInput, setGroupAvatarInput] = useState<File | string | null>(avatar || '');
	const [groupName, setGroupName] = useState(name || '');
	const [error, setError] = useState('');

	const dispatch = useAppDispatch();

	function handleEdit() {
		if (!groupName) {
			setError('Введите название группы');
			return;
		}

		const data = new FormData();

		if (groupAvatarInput) data.append('avatar', groupAvatarInput);
		data.append('chatName', groupName);

		try {
			if (id) {
				console.log('formData ava', data.getAll('avatar'));
				console.log('formData name', data.getAll('groupName'));

				dispatch(editChat({ chatId: id, formData: data }));
			}
		} catch (e: any) {
			setError(e);
		}
	}

	return (
		<div className="shadow-xl container p-4">
			<h4 className="w-full">Редактировать группу</h4>

			<div className="w-full flex gap-4 items-center">
				<AvatarInput onChange={setGroupAvatarInput} name={groupName} value={groupAvatarInput} />

				<div className="w-full flex flex-col gap-4">
					Название группы
					<FormInput
						onChange={(e) => {
							setError('');
							setGroupName(e);
						}}
						inputValue={groupName}
						inputName="groupName"
						autoFocus
					/>
				</div>
			</div>

			{error && <div className="text-error">{error}</div>}

			<div className="w-full flex justify-between">
				<Button onClick={onClose} variant="danger">
					Отмена
				</Button>

				<Button onClick={handleEdit} variant="primary">
					Сохранить
				</Button>
			</div>
		</div>
	);
};
