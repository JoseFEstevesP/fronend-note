import { useEffect, useState } from 'react';
import { pathUrl } from '../constant/url';
import useLists from '../hooks/useLists';
import useModal from '../hooks/useModal';
import FormRegisterNoteTeacherAdd from './FormRegisterNoteTeacherAdd';
import Modal from './Modal';
import TableRowNoteTeacher from './TableRowNoteTeacher';
import './table.css';
import TablaGetNote from './TablaGetNote';
import { IconNote } from './Icons';
const TableNoteAdd = () => {
	const [newDate, setNewDate] = useState({});
	const [note, setNote] = useState([]);
	const { data, handleLists } = useLists({
		urlDefault: `${pathUrl}/teacher/listsStudent`,
	});
	const {
		modal: modalRegisterNote,
		handelClose: handelCloseRegisterNote,
		handelOpen: handelOpenRegisterNote,
		loading: loadingRegisterNote,
		setLoading: setLoadingRegisterNote,
	} = useModal();
	const {
		modal: modalNote,
		handelClose: handelCloseNote,
		handelOpen: handelOpenNote,
	} = useModal();

	useEffect(() => {
		handleLists();
	}, []);
	return (
		<section className='table'>
			<Modal
				isOpen={modalRegisterNote}
				handelClose={handelCloseRegisterNote}
				loading={loadingRegisterNote}
				Icon={<IconNote />}
			>
				<FormRegisterNoteTeacherAdd
					isOpen={modalRegisterNote}
					setLoading={setLoadingRegisterNote}
					handleLists={handleLists}
					data={data}
					newDate={newDate}
					handelClose={handelCloseRegisterNote}
				/>
			</Modal>
			<Modal
				isOpen={modalNote}
				handelClose={handelCloseNote}
				Icon={<IconNote />}
			>
				<TablaGetNote note={note} />
			</Modal>
			<h2 className='table__title'>Nota</h2>
			<table className='table__content'>
				<thead>
					<tr>
						<th className='table__th'>CI</th>
						<th className='table__th'>Nombre</th>
						<th className='table__th'>Apellido</th>
						<th className='table__th'>Sección</th>
						<th className='table__th'>Materia</th>
						<th className='table__th'>acción</th>
					</tr>
				</thead>
				<tbody>
					{data?.map((item, i) => (
						<TableRowNoteTeacher
							handelOpen={handelOpenRegisterNote}
							handelOpenNote={handelOpenNote}
							key={i}
							data={item}
							setNewDate={setNewDate}
							setNote={setNote}
						/>
					))}
				</tbody>
			</table>
		</section>
	);
};
export default TableNoteAdd;
