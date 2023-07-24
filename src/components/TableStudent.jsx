import { useEffect, useState } from 'react';
import { pathUrl } from '../constant/url';
import useLists from '../hooks/useLists';
import useModal from '../hooks/useModal';
import FormRegisterStudent from './FormRegisterStudent';
import FormUpdateStudent from './FormUpdateStudent';
import { IconCourse, IconSection, IconStudent } from './Icons';
import Modal from './Modal';
import TableCourse from './TableCourse';
import TableRowStudent from './TableRowStudent';
import TableSection from './TableSection';
import Btn from './btn';

const TableStudent = () => {
	const [newData, setNewData] = useState(null);
	const { data, setData, handleLists } = useLists({
		urlDefault: `${pathUrl}/student/lists`,
	});
	const {
		modal: modalRegisterStudent,
		handelOpen: handelOpenRegisterStudent,
		handelClose: handelCloseRegisterStudent,
		loading: loadingRegisterStudent,
		setLoading: setLoadingRegisterStudent,
	} = useModal();
	const {
		modal: modalUpdateStudent,
		handelOpen: handelOpenUpdateStudent,
		handelClose: handelCloseUpdateStudent,
		loading: loadingUpdateStudent,
		setLoading: setLoadingUpdateStudent,
	} = useModal();
	const {
		modal: modalTableCourse,
		handelOpen: handelOpenTableCourse,
		handelClose: handelCloseTableCourse,
		loading: loadingTableCourse,
		setLoading: setLoadingTableCourse,
	} = useModal();
	const {
		modal: modalTableSection,
		handelOpen: handelOpenTableSection,
		handelClose: handelCloseTableSection,
		loading: loadingTableSection,
		setLoading: setLoadingTableSection,
	} = useModal();
	useEffect(() => handleLists(), []);

	return (
		<section className='table'>
			<Modal
				isOpen={modalRegisterStudent}
				handelClose={handelCloseRegisterStudent}
				loading={loadingRegisterStudent}
				Icon={<IconStudent />}
			>
				<FormRegisterStudent
					setLoading={setLoadingRegisterStudent}
					isOpen={modalRegisterStudent}
					setData={setData}
					handelClose={handelCloseRegisterStudent}
				/>
			</Modal>
			{newData && (
				<Modal
					isOpen={modalUpdateStudent}
					handelClose={handelCloseUpdateStudent}
					loading={loadingUpdateStudent}
					Icon={<IconStudent />}
				>
					<FormUpdateStudent
						setLoading={setLoadingUpdateStudent}
						isOpen={modalUpdateStudent}
						setData={setData}
						newData={newData}
						setNewData={setNewData}
						handelClose={handelCloseUpdateStudent}
					/>
				</Modal>
			)}

			<Modal
				isOpen={modalTableCourse}
				handelClose={handelCloseTableCourse}
				loading={loadingTableCourse}
				Icon={<IconCourse />}
			>
				<TableCourse
					isOpen={modalTableCourse}
					setLoading={setLoadingTableCourse}
				/>
			</Modal>
			<Modal
				isOpen={modalTableSection}
				handelClose={handelCloseTableSection}
				loading={loadingTableSection}
				Icon={<IconSection />}
			>
				<TableSection
					isOpen={modalTableSection}
					setLoading={setLoadingTableSection}
				/>
			</Modal>

			<h2 className='table__title'>Estudiantes</h2>
			<div className='table__contentBtn'>
				<Btn
					title='Boton de añadir usuario'
					classStyle='table__btnAdd'
					handelClick={handelOpenRegisterStudent}
				>
					Añadir estudiante <IconStudent classStyle='table__icon' />
				</Btn>
				<Btn
					title='Boton de añadir materias'
					classStyle='table__btnAdd'
					handelClick={handelOpenTableCourse}
				>
					materias <IconCourse classStyle='table__icon' />
				</Btn>
				<Btn
					title='Boton de añadir secciones'
					classStyle='table__btnAdd'
					handelClick={handelOpenTableSection}
				>
					secciones <IconSection classStyle='table__icon' />
				</Btn>
			</div>

			<table className='table__content'>
				<thead>
					<tr>
						<th className='table__th'>Estudiante</th>
						<th className='table__th'>Sección</th>
						<th className='table__th'>Materia</th>
						<th className='table__th'>Acción</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, i) => (
						<TableRowStudent
							handelOpen={handelOpenUpdateStudent}
							key={i}
							data={item}
							setData={setData}
							setNewData={setNewData}
						/>
					))}
				</tbody>
			</table>
		</section>
	);
};
export default TableStudent;
