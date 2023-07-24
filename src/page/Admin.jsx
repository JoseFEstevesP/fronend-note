import { Route, Routes } from 'react-router-dom';
import Menu from '../components/Menu';
import { MenuOptions } from '../components/MenuOptions';
import TableStudent from '../components/TableStudent';
import TableTeacher from '../components/TableTeacher';
import TableUser from '../components/TableUser';
import Headband from '../components/headband';
import TableNote from './../components/TableNote';
import './page.css';
const Administrador = () => {
	return (
		<section className='page'>
			<Headband classStyle='page__headband' />
			<div className='page__content'>
				<Menu>
					<MenuOptions name='Usuarios' to='/admin/user' />
					<MenuOptions name='Profesor' to='/admin/teacher' />
					<MenuOptions name='Estudiante' to='/admin/student' />
					<MenuOptions name='Nota' to='/admin/note' />
				</Menu>
				<Routes>
					<Route path='/user' element={<TableUser />} />
					<Route path='/teacher' element={<TableTeacher />} />
					<Route path='/student' element={<TableStudent />} />
					<Route path='/note' element={<TableNote />} />
				</Routes>
			</div>
		</section>
	);
};
export default Administrador;
