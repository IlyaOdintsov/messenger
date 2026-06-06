import './styles.scss';
import { useRef } from 'react';
import { useScrollbar } from '@/FSD_shared/lib/hooks/useScrollbar.ts';

type ScrollBarContainerType = {
	children: React.ReactNode;
	dependencies: any[];
	className?: string;
};

export const ScrollBar = ({ children, dependencies, className }: ScrollBarContainerType) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const hasScrollbar = useScrollbar(containerRef, dependencies);

	return (
		<div ref={containerRef} className={`${className} scrollbarContainer${hasScrollbar ? ' has-scrollbar' : ''}`}>
			{children}
		</div>
	);
};
