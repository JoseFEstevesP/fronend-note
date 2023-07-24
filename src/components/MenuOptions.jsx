import { NavLink } from 'react-router-dom';

export const MenuOptions = ({ to, name }) => {
	return (
		<li className='menu__li'>
			<NavLink
				to={to}
				className={({ isActive }) => {
					return `menu__a ${isActive ? 'menu__a--disable' : ''}`;
				}}
			>
				{name}
			</NavLink>
		</li>
	);
};
