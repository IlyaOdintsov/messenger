import { createPortal } from 'react-dom';
import './styles.scss';

const modalRoot = document.getElementById('portal');

interface IPopup {
	children: React.ReactNode;
}

interface ModalOverlay {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

function Popup({ children }: IPopup) {
	if (!modalRoot) return null;
	return createPortal(children, modalRoot);
}

export const ModalOverlay = ({ isOpen, onClose, children }: ModalOverlay) => {
	return (
		isOpen && (
			<Popup>
				<div className="modal-overlay" onClick={onClose}>
					<div className="modal-box" onClick={(e) => e.stopPropagation()}>
						{children}
					</div>
				</div>
			</Popup>
		)
	);
};
