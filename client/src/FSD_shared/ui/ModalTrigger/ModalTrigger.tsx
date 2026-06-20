import React, { cloneElement, isValidElement, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './styles.scss';

interface ModalTriggerProps {
	trigger: ReactNode;
	modal: ReactNode;
	size?: 'auto' | 'fixed';
	modalProps?: {
		onClose?: () => void;
		[key: string]: any;
	};
	closeOnOutsideClick?: boolean;
	closeOnEscape?: boolean;
}

export const ModalTrigger = ({ trigger, modal, size = 'auto', modalProps = {}, closeOnOutsideClick = true, closeOnEscape = true }: ModalTriggerProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
		modalProps.onClose?.();
	};

	const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (closeOnOutsideClick && e.target === e.currentTarget) {
			handleClose();
		}
	};

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (closeOnEscape && e.key === 'Escape' && isOpen) {
				handleClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, closeOnEscape]);

	const triggerElement = isValidElement(trigger) ? (
		cloneElement(trigger as React.ReactElement<any>, { onClick: handleOpen })
	) : (
		<span onClick={handleOpen}>{trigger}</span>
	);

	const portalRoot = document.getElementById('portal') || document.body;

	return (
		<>
			{triggerElement}

			{isOpen &&
				portalRoot &&
				createPortal(
					<div className="modal-overlay" data-portal="true" onClick={handleOutsideClick}>
						<div className={`modal-content modal-content-${size}`}>
							{isValidElement(modal)
								? cloneElement(modal as React.ReactElement<any>, {
										onClose: handleClose,
										...modalProps,
									})
								: modal}
						</div>
					</div>,
					portalRoot
				)}
		</>
	);
};
