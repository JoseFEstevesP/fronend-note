import { useEffect, useState } from 'react';
import useDelete from '../hooks/useDelete';
import { useGet } from '../hooks/useGet';
import { IconDelete, IconUpdate } from './Icons';
import Btn from './btn';
const TableRow = ({ data, setData, handelOpen, setNewData }) => {
	const { handelGet } = useGet();
	const [rolName, setRolName] = useState('');
	const { deleteData } = useDelete({ urlDefault: '/user/', setData });
	const { uid, ci, name, surname, email, rolUid } = data;
	useEffect(() => {
		handelGet(`/rol/${rolUid}`).then(res => setRolName(res.name));
	}, [data]);
	const handleDelete = () => deleteData(uid);
	const handleUpdate = () => {
		handelOpen();
		setNewData({ uid, ci, name, surname, email, rolUid });
	};
	return (
		<>
			<tr>
				<td className='table__td'>{ci}</td>
				<td className='table__td'>{name}</td>
				<td className='table__td'>{surname}</td>
				<td className='table__td'>{email}</td>
				<td className='table__td'>{rolName}</td>
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
		</>
	);
};
export default TableRow;
