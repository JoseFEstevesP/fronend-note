import { useEffect, useState } from 'react';
import { pathUrl } from '../constant/url';
import useLists from '../hooks/useLists';
import useModal from '../hooks/useModal';
import FormRegisterTeacher from './FormRegisterTeacher';
import FormUpdateTeacher from './FormUpdateTeacher';
import { IconCourse, IconSection, IconTeacher } from './Icons';
import Modal from './Modal';
import TableCourse from './TableCourse';
import TableRowTeacher from './TableRowTeacher';
import TableSection from './TableSection';
import Btn from './btn';
import './table.css';
const TableTeacher = () => {
	const [newData, setNewData] = useState(null);
	const { data, setData, handleLists } = useLists({
		urlDefault: `${pathUrl}/teacher/lists`,
	});
	const {
		modal: modalRegisterTeacher,
		handelOpen: handelOpenRegisterTeacher,
		handelClose: handelCloseRegisterTeacher,
		loading: loadingRegisterTeacher,
		setLoading: setLoadingRegisterTeacher,
	} = useModal();
	const {
		modal: modalUpdateTeacher,
		handelOpen: handleOpenUpdateTeacher,
		handelClose: handleCloseUpdateTeacher,
		loading: loadingUpdateTeacher,
		setLoading: setLoadingUpdateTeacher,
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
				isOpen={modalRegisterTeacher}
				handelClose={handelCloseRegisterTeacher}
				loading={loadingRegisterTeacher}
				Icon={<IconTeacher />}
			>
				<FormRegisterTeacher
					isOpen={modalRegisterTeacher}
					setData={setData}
					handelClose={handelCloseRegisterTeacher}
					setLoading={setLoadingRegisterTeacher}
				/>
			</Modal>
			{newData && (
				<Modal
					isOpen={modalUpdateTeacher}
					handelClose={handleCloseUpdateTeacher}
					loading={loadingUpdateTeacher}
					Icon={<IconTeacher />}
				>
					<FormUpdateTeacher
						setLoading={setLoadingUpdateTeacher}
						setData={setData}
						newData={newData}
						setNewData={setNewData}
						handelClose={handleCloseUpdateTeacher}
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

			<h2 className='table__title'>Profesores</h2>
			<div className='table__contentBtn'>
				<Btn
					title='Boton de añadir profesor'
					classStyle='table__btnAdd'
					handelClick={handelOpenRegisterTeacher}
				>
					Añadir profesor <IconTeacher classStyle='table__icon' />
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
						<th className='table__th'>Profesor</th>
						<th className='table__th'>Sección</th>
						<th className='table__th'>Materia</th>
						<th className='table__th'>Acción</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, i) => (
						<TableRowTeacher
							handelOpen={handleOpenUpdateTeacher}
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
export default TableTeacher;
