import './styles.scss';
import moon from '@/FSD_shared/assets/icons/moon.svg';
import sun from '@/FSD_shared/assets/icons/sun.svg';
import { useEffect, useState } from 'react';
import { useTheme } from '@/FSD_shared/lib/hooks/useTheme.ts';

type Theme = 'light' | 'dark';

export const ThemeSwitcher = () => {
	const { theme, toggleTheme } = useTheme();
	const [newTheme, setNewTheme] = useState<Theme>('dark');

	useEffect(() => {
		document.body.className = `${theme}-theme`;
	}, [theme]);

	return (
		<label htmlFor="themeSwitcher" className="theme-btn">
			<input
				value={newTheme}
				onChange={() => {
					setNewTheme(newTheme === 'dark' ? 'light' : 'dark');
					toggleTheme(newTheme === 'dark' ? 'light' : 'dark');
				}}
				type="checkbox"
				id="themeSwitcher"
			/>
			<div className="iconWrapper switchIcons">
				<img className="img sun" src={sun} alt="sun" />
				<img className="img moon" src={moon} alt="moon" />
			</div>
		</label>
	);
};
