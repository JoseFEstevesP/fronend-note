import { useEffect } from 'react';
import { IconUser } from './Icons';
import Btn from './btn';
import './modal.css';
const Modal = ({
	children,
	isOpen,
	handelClose,
	loading,
	classNameContent = '',
	classNameModal = '',
	Icon = <IconUser />,
}) => {
	useEffect(() => {
		if (isOpen) {
			document.documentElement.classList.add('hiddenScroll');
		} else {
			document.documentElement.classList.remove('hiddenScroll');
		}
	}, [isOpen]);
	return (
		<article
			className={`modal ${isOpen ? 'modal--show' : ''} ${classNameModal}`}
		>
			<div
				className={`modal__content  ${
					isOpen ? 'modal__content--show' : ''
				} ${classNameContent} `}
			>
				<div className='modal__iconUser'>{loading ? 'Cargando' : Icon}</div>
				<Btn
					title='botón cerrar modal'
					classStyle='modal__closeModal'
					handelClick={handelClose}
				>
					<svg viewBox='0 0 384 512'>
						<path d='M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z' />
					</svg>
				</Btn>
				{children}
			</div>
		</article>
	);
};
export default Modal;
