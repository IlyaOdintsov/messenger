import { NavigationLink, ThemeSwitcher } from '../../shared';
import './styles.scss';

import contactsIcon from '../../assets/contacts.svg';
import chatIcon from '../../assets/chat.svg';
import settingsIcon from '../../assets/settings.svg';
import bellIcon from '../../assets/bell.svg';
import profileIcon from '../../assets/camera.svg';

import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useAppSelector';

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
