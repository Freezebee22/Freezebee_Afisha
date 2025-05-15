import { memo } from 'react';
import styles from './modal.module.css';
import { TModalUIProps } from './type';

export const ModalUI = memo(
	({ title, onClose, children }: TModalUIProps) => (
		<>
			<div className={styles.modal}>
				<button className={styles.close} onClick={onClose} aria-label="Закрыть модалку">
        			×
      			</button>
				<div className={styles.content}>{children}</div>
			</div>
			<div className={styles.overlay} onClick={onClose} />
		</>
	)
);
