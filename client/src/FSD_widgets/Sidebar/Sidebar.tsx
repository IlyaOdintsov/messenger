import './styles.scss';
import contactsIcon from '@/FSD_shared/assets/icons/contacts.svg';
import chatIcon from '@/FSD_shared/assets/icons/chat.svg';
import settingsIcon from '@/FSD_shared/assets/icons/settings.svg';
import bellIcon from '@/FSD_shared/assets/icons/bell.svg';
import { ThemeSwitcher } from '@/FSD_features/theme/ThemeSwitcher/ThemeSwitcher.tsx';
import { useTypedSelector } from '@/FSD_shared/lib/hooks/useTypedSelector.ts';
import { Avatar } from '@/FSD_shared/ui/Avatar/Avatar.tsx';
import { IconButton } from '@/FSD_shared/ui/IconButton/IconButton.tsx';

export const Sidebar = () => {
	const profileAvatar = useTypedSelector((state) => state.auth.data?.user.avatarUrl);
	const profileFirstName = useTypedSelector((state) => state.auth.data?.user.firstName);

	return (
		<>
			<div className="container sidebar">
				<img src="/logo.svg" alt="logo" className="avatar-sm" />

				<div className="flex flex-col justify-between gap-4 h-full side-navs-panel">
					<nav className="flex flex-col gap-4">
						<IconButton icon={contactsIcon} to="/contacts" size="sm" variant="accent" />

						<IconButton icon={chatIcon} to="/chats" size="sm" variant="accent" />

						<IconButton icon={bellIcon} to="/notifications" size="sm" variant="accent" />
					</nav>

					<div className="flex flex-col gap-4">
						<IconButton
							icon={profileAvatar && profileFirstName && <Avatar avatarUrl={profileAvatar} firstName={profileFirstName} size="sm" />}
							to="/profile"
							size="sm"
							variant="accent"
						/>

						<IconButton icon={settingsIcon} to="/settings" size="sm" variant="accent" />

						<ThemeSwitcher />
					</div>
				</div>
			</div>
		</>
	);
};
