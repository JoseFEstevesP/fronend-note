import { useEffect } from 'react';
import { IconUser, IconClose } from './Icons';
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
					<IconClose />
				</Btn>
				{children}
			</div>
		</article>
	);
};
export default Modal;
