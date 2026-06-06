import './styles.scss';
import contactsIcon from '@/FSD_shared/assets/icons/contacts.svg';
import chatIcon from '@/FSD_shared/assets/icons/chat.svg';
import settingsIcon from '@/FSD_shared/assets/icons/settings.svg';
import bellIcon from '@/FSD_shared/assets/icons/bell.svg';
import profileIcon from '@/FSD_shared/assets/icons/camera.svg';
import { Link } from 'react-router-dom';
import { NavigationLink } from '@/FSD_shared/ui/NavLink/NavLink.tsx';
import { ThemeSwitcher } from '@/FSD_features/theme/ThemeSwitcher/ThemeSwitcher.tsx';
import { useTypedSelector } from '@/FSD_shared/lib/hooks/useAppSelector.ts';

export const Sidebar = () => {
	const profileAvatar = useTypedSelector((state) => state.auth.data?.user.avatarUrl);

	return (
		<>
			<div className="sidebar">
				<div className="logoWrapper">
					<img src="/logo.svg" alt="logo" />
				</div>

				<div className="side-navs-panel">
					<nav className="navBar">
						<NavigationLink to="/contacts">
							<div className="iconWrapper">
								<img src={contactsIcon} alt="friends" />
							</div>
						</NavigationLink>

						<NavigationLink to="/chats">
							<div className="iconWrapper">
								<img src={chatIcon} alt="chat" />
							</div>
						</NavigationLink>

						<NavigationLink to="/">
							<div className="iconWrapper">
								<img src={bellIcon} alt="notifications" />
							</div>
						</NavigationLink>
					</nav>

					<div className="settingsWrapper">
						<Link to="/profile" className="iconWrapper profile">
							<img src={profileAvatar ? profileAvatar : profileIcon} alt="profile" style={{ padding: profileAvatar ? '' : '4px' }} />
						</Link>

						<Link to="/settings" className="iconWrapper">
							<img src={settingsIcon} alt="settings" />
						</Link>

						<ThemeSwitcher />
					</div>
				</div>
			</div>
		</>
	);
};
