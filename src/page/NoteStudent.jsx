import { Route, Routes } from 'react-router-dom';
import Menu from '../components/Menu';
import { MenuOptions } from '../components/MenuOptions';
import TableNoteStudent from '../components/TableNoteStudent';
import Headband from '../components/headband';
import './page.css';
const NoteStudent = () => {
	return (
		<section className='page'>
			<Headband classStyle='page__headband' />
			<div className='page__content'>
				<Menu>
					<MenuOptions name='Nota' to='/student/note' />
				</Menu>
				<Routes>
					<Route path='/note' element={<TableNoteStudent />} />
				</Routes>
			</div>
		</section>
	);
};
export default NoteStudent;
