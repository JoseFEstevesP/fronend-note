import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Headband from '../components/headband';
import './options.css';
import { userData } from '../context/userDataUser';
import useExit from '../hooks/useExit';
import Btn from '../components/btn';
const Options = () => {
	const { handelClickExit } = useExit();
	const { dataUser } = useContext(userData);
	const links = {
		administrador: (
			<Link to='/admin' className='options__link'>
				Administrador
			</Link>
		),
		profesor: (
			<Link to='/teacher' className='options__link'>
				Profesor
			</Link>
		),
		estudiante: (
			<Link to='/student' className='options__link'>
				Estudiante
			</Link>
		),
	};
	return (
		<article className='options'>
			<Headband />
			<nav className='options__menu'>
				{links[dataUser.rolName]}
				<Btn
					classStyle='options__btn'
					handelClick={handelClickExit}
					title='Salir'
				>
					Salir
				</Btn>
			</nav>
		</article>
	);
};
export default Options;
