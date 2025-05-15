import { memo, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { TModalProps } from './types';
import { ModalUI } from '../ui/modal';

const modalRoot = document.getElementById('modals');

export const Modal = memo(({ title, onClose, children }: TModalProps) => {
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			e.key === 'Escape' && onClose();
		};

		document.addEventListener('keydown', handleEsc);
		document.body.classList.add("body-lock");
		return () => {
			document.removeEventListener('keydown', handleEsc);
			document.body.classList.remove("body-lock");
		};
	}, [onClose]);

	return ReactDOM.createPortal(
		<ModalUI title={title} onClose={onClose}>
			{children}
		</ModalUI>,
		modalRoot as HTMLDivElement
	);
});
