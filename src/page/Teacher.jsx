import { Route, Routes } from 'react-router-dom';
import Menu from '../components/Menu';
import { MenuOptions } from '../components/MenuOptions';
import TableNoteAdd from '../components/TableNoteAdd';
import Headband from '../components/headband';
import './page.css';
const Teacher = () => {
	return (
		<section className='page'>
			<Headband classStyle='page__headband' />
			<div className='page__content'>
				<Menu>
					<MenuOptions name='Nota' to='/teacher/note' />
				</Menu>
				<Routes>
					<Route path='/note' element={<TableNoteAdd />} />
				</Routes>
			</div>
		</section>
	);
};
export default Teacher;
