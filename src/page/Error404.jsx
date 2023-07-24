import { NavLink } from 'react-router-dom';
import Headband from '../components/headband';
import './options.css';
import './page.css';
const Error404 = () => {
	return (
		<section className='page'>
			<Headband classStyle='page__headband' />
			<div className='page__content'>
				<h1>Error 404</h1>
				<p>Asegúrese de que la ruta esta bien escrita, está ruta no existe</p>
				<nav className='options__menu'>
					<NavLink className='options__link' to='/'>
						Inicio
					</NavLink>
				</nav>
			</div>
		</section>
	);
};
export default Error404;
