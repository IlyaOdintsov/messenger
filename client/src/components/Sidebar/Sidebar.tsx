import { NavigationLink, ThemeSwitcher } from '../../shared';
import './styles.scss';

import friendsIcon from '../../assets/friends.svg';
import chatIcon from '../../assets/chat.svg';
import settingsIcon from '../../assets/settings.svg';
import bellIcon from '../../assets/bell.svg';
import profileIcon from '../../assets/camera.svg';
import test from '../../assets/testPic.png';

import { Link } from 'react-router-dom';

export const Sidebar = () => {
	return (
		<>
			<div className="sidebar">
				<div className="logoWrapper">
					<img src="/logo.svg" alt="logo" />
				</div>

				<div className="side-navs-panel">
					<nav className="navBar">
						<NavigationLink to="/1">
							<div className="iconWrapper">
								<img src={friendsIcon} alt="friends" />
							</div>
						</NavigationLink>

						<NavigationLink to="/chats">
							<div className="iconWrapper">
								<img src={chatIcon} alt="chat" />
							</div>
						</NavigationLink>

						<NavigationLink to="/1">
							<div className="iconWrapper">
								<img src={bellIcon} alt="notifications" />
							</div>
						</NavigationLink>
					</nav>

					<div className="settingsWrapper">
						<Link to="/" className="iconWrapper profile">
							<img src={test} alt="test" />
							{/* <img src={profileIcon} alt="profile" /> */}
						</Link>

						<Link to="/" className="iconWrapper">
							<img src={settingsIcon} alt="settings" />
						</Link>

						<ThemeSwitcher />
					</div>
				</div>
			</div>
		</>
	);
};
