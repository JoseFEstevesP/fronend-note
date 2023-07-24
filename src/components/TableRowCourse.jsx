import useDelete from '../hooks/useDelete';
import { IconDelete, IconUpdate } from './Icons';
import Btn from './btn';
const TableRowCourse = ({ data, setData, setNewData }) => {
	const { deleteData } = useDelete({ urlDefault: '/course/', setData });
	const { uid, name, code } = data;
	const handleDelete = () => deleteData(uid);
	const handleUpdate = () => {
		setNewData({ uid, name, code });
	};
	return (
		<tr>
			<td className='table__td'>{name}</td>
			<td className='table__td'>{code}</td>
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
export default TableRowCourse;
