import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { userData } from '../context/userDataUser';
import useExit from '../hooks/useExit';
import BtnTheme from './BtnTheme';
import Btn from './btn';
import './menu.css';
import { IconExit, IconUser } from './Icons';
const route = {
	profesor: 'noteTeacher',
	estudiante: 'student',
	administrador: 'admin',
};
const Menu = ({ children }) => {
	const { handelClickExit } = useExit();
	const { dataUser } = useContext(userData);
	const handleClickBar = e => {
		e.target.firstChild.classList.toggle('menu__bar--show');
		e.target.parentElement.nextElementSibling.classList.toggle(
			'menu__menu--show'
		);
	};
	const handelClickUser = e => {
		e.target.nextElementSibling.classList.toggle('menu__useOption--show');
	};
	return (
		<section className='menu'>
			<p className='menu__info'>{`${dataUser.rolName}, ${dataUser.name} ${dataUser.surname}`}</p>
			<div className='menu__content'>
				<div className='menu__contentBtn'>
					<Btn
						title='boton menu'
						classStyle='menu__btn'
						handelClick={handleClickBar}
					>
						<div className='menu__bar'></div>
					</Btn>
				</div>
				<nav className='menu__menu'>
					<ul className='menu__ul'>
						<li className='menu__li'>
							<NavLink
								to={`/${route[dataUser.rolName]}`}
								className={({ isActive }) => {
									return `menu__a ${isActive ? 'menu__a--disable' : ''}`;
								}}
								end
							>
								Inicio
							</NavLink>
						</li>
						{children}
					</ul>
				</nav>
				<div className='menu__contentUser'>
					<div className='menu__contentOptions'>
						<Btn
							classStyle='menu__user'
							title={`user ${dataUser.name}`}
							handelClick={handelClickUser}
						>
							<IconUser classStyle='menu__btnIcon' />
						</Btn>
						<nav className='menu__useOption'>
							<ul className='menu__useUl'>
								<Btn classStyle='menu__user' title={`user ${dataUser.name}`}>
									<IconUser classStyle='menu__btnIcon' />
								</Btn>
								<BtnTheme classStyle='menu__user' />
								<Btn
									classStyle='menu__user menu__user--salir'
									title='Boton salir'
									handelClick={handelClickExit}
								>
									<IconExit />
								</Btn>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</section>
	);
};
export default Menu;
