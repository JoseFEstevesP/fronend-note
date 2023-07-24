import useDelete from '../hooks/useDelete';
import { IconDelete, IconUpdate } from './Icons';
import Btn from './btn';
const TableRowRol = ({ data, setData, setNewData }) => {
	const { deleteData } = useDelete({ urlDefault: '/rol/', setData });
	const { uid, name } = data;
	const handleDelete = () => deleteData(uid);
	const handleUpdate = () => {
		setNewData({ uid, name });
	};
	return (
		<tr>
			<td className='table__td'>{name}</td>
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
export default TableRowRol;
