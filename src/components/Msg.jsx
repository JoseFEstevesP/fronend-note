import Btn from './btn';
import './msg.css';

const Msg = ({ msg, btnActions = false, onClick }) => {
	return (
		<article className='msg'>
			<div className='msg__content'>
				<h3 className='msg__title'>{msg}</h3>
				{btnActions && (
					<Btn
						classStyle='msg__btn'
						title={`mensaje de error: ${msg}`}
						handelClick={onClick}
					>
						Confirmar
					</Btn>
				)}
			</div>
		</article>
	);
};
export default Msg;
