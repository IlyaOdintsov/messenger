import paperclip from '@/FSD_shared/assets/icons/paperclip.svg';
import sendIcon from '@/FSD_shared/assets/icons/sendIcon.svg';
import { socket } from '@/FSD_app/App.tsx';
import { useTypedSelector } from '@/FSD_shared/lib/hooks/useTypedSelector.ts';
import { useState } from 'react';
import { IconButton } from '@/FSD_shared/ui/IconButton/IconButton.tsx';

interface ChatInputProps {
	groupId: string;
}

export const ChatInput = ({ groupId }: ChatInputProps) => {
	const [currentMessage, setCurrentMessage] = useState('');

	const userId = useTypedSelector((state) => state.auth.data?.user.id);

	async function sendMessage() {
		if (!currentMessage.trim()) return;

		const messageData = {
			chatId: groupId,
			sender: userId,
			text: currentMessage,
		};

		console.log('sending...');
		socket.emit('send_message', messageData);
		setCurrentMessage('');
	}

	return (
		<div className="flex gap-4 items-center">
			<IconButton icon={paperclip} size="sm" />

			<input
				autoFocus
				name="currentMessage"
				className="w-full h-full flex rounded-lg chatInput"
				type="text"
				placeholder="message..."
				value={currentMessage}
				onChange={(e) => setCurrentMessage(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') sendMessage();
				}}
			/>

			<IconButton icon={sendIcon} onClick={sendMessage} />
		</div>
	);
};
