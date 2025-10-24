import { useEffect, useState } from 'react';

export const useScrollbar = (ref: React.RefObject<HTMLElement | null>, deps: any[]): boolean => {
	const [hasScrollbar, setHasScrollbar] = useState(false);

	useEffect(() => {
		function checkScrollbar() {
			if (!ref.current) return;
			setHasScrollbar(ref.current.scrollHeight > ref.current.clientHeight);
		}

		checkScrollbar();

		window.addEventListener('resize', checkScrollbar);

		return () => window.removeEventListener('resize', checkScrollbar);
	}, [ref, deps]);

	return hasScrollbar;
};
