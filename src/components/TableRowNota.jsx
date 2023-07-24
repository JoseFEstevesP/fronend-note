import useDelete from '../hooks/useDelete';
import { IconDelete, IconUpdate } from './Icons';
import Btn from './btn';
const TableRowNota = ({ data, setData, handelOpen, setNewData }) => {
	const { deleteData } = useDelete({ urlDefault: '/note/', setData });
	const { uid, rating, uidStudent, uidTeacher, courseUid, sectionUid } = data;
	const handleDelete = () => deleteData(uid);
	const handleUpdate = () => {
		handelOpen();
		setNewData({ uid, uidStudent, courseUid, sectionUid });
	};
	return (
		<tr>
			<td className='table__td'>{uidStudent}</td>
			<td className='table__td'>{sectionUid}</td>
			<td className='table__td'>{courseUid}</td>
			<td className='table__td'>{uidTeacher}</td>
			<td className='table__td'>{rating}</td>
			<td className='table__td'>
				<div className='table__btnActions'>
					<Btn
						title='botón eliminar usuario'
						classStyle='table__btn table__btn--delete'
						handelClick={handleDelete}
					>
						<IconDelete />
					</Btn>
					<Btn
						title='botón actualizar usuario'
						classStyle='table__btn table__btn--update'
						handelClick={handleUpdate}
					>
						<IconUpdate />
					</Btn>
				</div>
			</td>
		</tr>
	);
};
export default TableRowNota;
