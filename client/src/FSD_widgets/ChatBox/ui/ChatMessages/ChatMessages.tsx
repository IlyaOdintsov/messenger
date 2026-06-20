import { MessageBlock } from '@/FSD_entities/message/ui/Message/Message.tsx';
import { ScrollBar } from '@/FSD_shared/ui';
import { Message } from '@/FSD_shared/types/chats_Types.ts';

export const ChatMessages = ({ messages }: { messages: Message[] }) => {
	return (
		<>
			{messages.length > 0 ? (
				<ScrollBar dependencies={messages} className="messages">
					{messages.map((message) => (
						<MessageBlock message={message} key={message.id} />
					))}
				</ScrollBar>
			) : (
				<div className="emptyMessages">
					<h4>No Messages Yet</h4>
					<p>Send a message to start a dialogue.</p>
				</div>
			)}
		</>
	);
};
