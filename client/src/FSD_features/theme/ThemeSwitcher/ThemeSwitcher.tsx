import './styles.scss';

import moon from '../../../FSD_shared/assets/icons/moon.svg';
import sun from '../../../FSD_shared/assets/icons/sun.svg';
import { useEffect, useState } from 'react';

export const ThemeSwitcher = () => {
	const [isDarkTheme, setIsDarkTheme] = useState(true);

	useEffect(() => {
		document.body.classList = isDarkTheme ? 'dark-theme' : 'light-theme';
	}, [isDarkTheme]);

	return (
		<label htmlFor="themeSwitcher" className="theme-btn">
			<input onChange={() => setIsDarkTheme(!isDarkTheme)} type="checkbox" id="themeSwitcher" />
			<div className="iconWrapper switchIcons">
				<img className="img sun" src={sun} alt="sun" />
				<img className="img moon" src={moon} alt="moon" />
			</div>
		</label>
	);
};
