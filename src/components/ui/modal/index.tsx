import { memo } from 'react';
import styles from './modal.module.css';
import { TModalUIProps } from './type';

export const ModalUI = memo(
	({ title, onClose, children }: TModalUIProps) => (
		<>
			<div className={styles.modal}>
				<div className={styles.header}>
					<h3 className={`${styles.title} text text_type_main-large`}>
						{title}
					</h3>
					{/*<button className={styles.button} type='button'>
						<CloseIcon type='primary' onClick={onClose} />
					</button>*/}
				</div>
				<div className={styles.content}>{children}</div>
			</div>
			<div className={styles.overlay} onClick={onClose} />
		</>
	)
);
