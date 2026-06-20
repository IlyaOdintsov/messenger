import './styles.scss';
import { useState } from 'react';
import { useTypedSelector } from '@/FSD_shared/lib/hooks/useTypedSelector.ts';
import { useAppDispatch } from '@/FSD_shared/lib/hooks/useAppDispatch.ts';
import { createChat } from '@/FSD_shared/store/slices/ChatSlice.ts';
import { AvatarInput, FormInput } from '@/FSD_shared/ui';
import { Button } from '@/FSD_shared/ui/Button/Button.tsx';

interface NewChatProps {
	onClose?: () => void;
}

export const NewChat = ({ onClose }: NewChatProps) => {
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
		} catch (e: any) {
			setError(e);
		}
	}

	return (
		<div className="shadow-xl container p-4">
			<h4 className="w-full">Новая группа</h4>

			<div className="flex gap-4 justify-between w-full items-center">
				<AvatarInput onChange={setGroupAvatarInput} value={groupAvatarInput} />

				<div className="flex flex-col gap-4 w-full">
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

				<Button onClick={handleCreation} variant="primary">
					Далее
				</Button>
			</div>
		</div>
	);
};
