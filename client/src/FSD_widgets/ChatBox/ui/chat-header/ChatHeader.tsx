import './styles.scss';
import menuIcon from '@/FSD_shared/assets/icons/menu.svg';
import { EditChat } from '@/FSD_widgets/ChatBox/ui/EditChat/EditChat.tsx';
import { InfoChat } from '@/FSD_widgets/ChatBox/ui/InfoChat/InfoChat.tsx';
import { Avatar } from '@/FSD_shared/ui/Avatar/Avatar.tsx';
import { Dropdown } from '@/FSD_shared/ui/Dropdown/Dropdown.tsx';
import { IconButton } from '@/FSD_shared/ui/IconButton/IconButton.tsx';
import { useCurrentChat } from '@/FSD_shared/lib/hooks/useCurrentChat.ts';
import { ActionButton } from '@/FSD_shared/ui/ButtonAction/ButtonAction.tsx';
import { Button } from '@/FSD_shared/ui/Button/Button.tsx';

export const ChatHeader = () => {
	const { id, avatar: avatarUrl, name: chatName, membersCount, type } = useCurrentChat();

	if (!id) return null;

	return (
		<>
			<div className="w-full flex flex-center p-4 gap-4 chatHeader">
				{chatName && <Avatar avatarUrl={avatarUrl} firstName={chatName} size="lg" />}

				<div className="flex flex-col justify-between gap-2 w-full">
					<h3>{chatName}</h3>
					<p>{membersCount} members</p>
				</div>

				<Dropdown trigger={<IconButton icon={menuIcon} size="lg" variant="accent" />}>
					<ActionButton
						trigger={
							<Button className="dropdown-item" fullWidth={true}>
								Информация
							</Button>
						}
						modal={<InfoChat />}
						modalSize="fixed"
					/>

					{type === 'group' && (
						<ActionButton
							trigger={
								<Button className="dropdown-item" fullWidth={true}>
									Редактировать
								</Button>
							}
							modal={<EditChat />}
						/>
					)}
				</Dropdown>
			</div>
		</>
	);
};
