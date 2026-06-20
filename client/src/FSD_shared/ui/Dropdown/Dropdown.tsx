import React, { ReactNode, useState, isValidElement, useEffect, cloneElement } from 'react';
import { createPortal } from 'react-dom';
import './styles.scss';
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/react';

interface DropdownProps {
	trigger: ReactNode | ((props: { isOpen: boolean; onClick: () => void }) => ReactNode);
	children: ReactNode;
	closeOnOutsideClick?: boolean;
	closeOnEscape?: boolean;
}

export const Dropdown = ({ trigger, children, closeOnOutsideClick = true, closeOnEscape = true }: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => setIsOpen(!isOpen);
	const handleClose = () => setIsOpen(false);

	const { refs, floatingStyles } = useFloating({
		open: isOpen,
		onOpenChange: () => {},
		placement: 'bottom-end',
		middleware: [offset(-2), flip(), shift({ padding: 8 })],
		whileElementsMounted: autoUpdate,
	});

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (!closeOnOutsideClick) return;

			const target = e.target as Node;

			const triggerElement = refs.reference.current;
			const floatingElement = refs.floating.current;

			if (triggerElement && triggerElement instanceof Element && triggerElement.contains(target)) {
				return;
			}

			if (floatingElement && floatingElement instanceof Element && floatingElement.contains(target)) {
				return;
			}

			handleClose();
		};

		const handleEscape = (e: KeyboardEvent) => {
			if (closeOnEscape && e.key === 'Escape' && isOpen) {
				handleClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			document.addEventListener('keydown', handleEscape);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen, closeOnOutsideClick, closeOnEscape]);

	const renderTrigger = () => {
		if (typeof trigger === 'function') {
			return trigger({ isOpen, onClick: handleOpen });
		}

		if (isValidElement(trigger)) {
			const triggerElement = trigger as React.ReactElement<any>;

			return cloneElement(triggerElement, {
				ref: refs.setReference,
				onClick: (e: React.MouseEvent) => {
					if (triggerElement.props.onClick) {
						triggerElement.props.onClick(e);
					}
					handleOpen();
				},
				isOpen: isOpen,
			});
		}

		return (
			<span ref={refs.setReference} onClick={handleOpen}>
				{trigger}
			</span>
		);
	};

	const portalRoot = document.getElementById('portal') || document.body;

	return (
		<>
			{renderTrigger()}

			{isOpen &&
				createPortal(
					<div ref={refs.setFloating} className="dropdown-menu" style={floatingStyles}>
						{children}
					</div>,
					portalRoot
				)}
		</>
	);
};
