import { SearchInput } from '../../../shared';
import { ChatList } from './ChatList/ChatList';

import './styles.scss';
import plus from '../../../assets/plus.svg';

export const ChatListPanel = () => {
	return (
		<div className="chatListPanel">
			<div className="chats-row">
				<h2>Chats</h2>
				<div className="chats-manage-btn">
					<img src={plus} alt="plus" />
				</div>
			</div>
			<SearchInput />
			<ChatList />
		</div>
	);
};
