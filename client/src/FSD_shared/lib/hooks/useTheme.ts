import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
	const [theme, setTheme] = useState<Theme>('dark');

	useEffect(() => {
		const savedTheme = localStorage.getItem('app-theme') as Theme;

		if (savedTheme) {
			setTheme(savedTheme);
			document.body.className = savedTheme === 'dark' ? 'dark-theme' : 'light-theme';
		}
	}, []);

	const toggleTheme = (newTheme: Theme) => {
		setTheme(newTheme);
		localStorage.setItem('app-theme', newTheme);
		document.body.className = `${newTheme}-theme`;
	};

	return { theme, toggleTheme };
};
