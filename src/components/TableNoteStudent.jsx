import { useEffect, useState } from 'react';
import { pathUrl } from '../constant/url';
import useLists from '../hooks/useLists';
import useModal from '../hooks/useModal';
import { IconNote } from './Icons';
import Modal from './Modal';
import TablaGetNote from './TablaGetNote';
import TableRowNotaStudent from './TableRowNotaStudent';

const TableNoteStudent = () => {
	const [details, setDetails] = useState([]);
	const { data, handleLists } = useLists({
		urlDefault: `${pathUrl}/user/note`,
	});
	const { modal, handelClose, handelOpen } = useModal();
	useEffect(() => {
		handleLists();
	}, []);

	return (
		<section className='table'>
			<Modal isOpen={modal} handelClose={handelClose} Icon={<IconNote />}>
				<TablaGetNote note={details} />
			</Modal>
			<h2 className='table__title'>Nota</h2>
			<table className='table__content'>
				<thead>
					<tr>
						<th className='table__th'>Materia</th>
						<th className='table__th'>Profesor</th>
						<th className='table__th'>Sección</th>
						<th className='table__th'>Nota</th>
						<th className='table__th'>Detalles</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, i) => (
						<TableRowNotaStudent
							data={item}
							key={i}
							handelOpen={handelOpen}
							setDetails={setDetails}
						/>
					))}
				</tbody>
			</table>
		</section>
	);
};
export default TableNoteStudent;
