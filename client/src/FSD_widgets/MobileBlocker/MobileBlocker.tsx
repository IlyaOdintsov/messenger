import { useEffect, useState } from 'react';
import './styles.scss';

const MOBILE_BREAKPOINT = 768; // px

export const MobileBlocker = ({ children }: { children: React.ReactNode }) => {
	const [isMobile, setIsMobile] = useState<boolean | null>(null);

	useEffect(() => {
		const checkScreen = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};

		checkScreen();
		window.addEventListener('resize', checkScreen);

		return () => window.removeEventListener('resize', checkScreen);
	}, []);

	// Пока не определили размер экрана, показываем ничего (или лоадер)
	if (isMobile === null) {
		return null;
	}

	// Если мобильное устройство - показываем блокировку
	if (isMobile) {
		return <MobileBlockerScreen />;
	}

	// Если десктоп - показываем приложение
	return <>{children}</>;
};

const MobileBlockerScreen = () => {
	return (
		<div className="mobile-blocker">
			<div className="mobile-blocker__content">
				<div className="mobile-blocker__icon">📱</div>
				<h1 className="mobile-blocker__title">Доступ ограничен</h1>
				<p className="mobile-blocker__message">
					Данное приложение оптимизировано только для <strong>десктопных устройств</strong>.
				</p>
				<p className="mobile-blocker__submessage">Пожалуйста, откройте сайт на компьютере с шириной экрана не менее 768px.</p>
				<div className="mobile-blocker__info">
					<p>Текущая ширина экрана: {typeof window !== 'undefined' ? window.innerWidth : '...'}px</p>
				</div>
			</div>
		</div>
	);
};
