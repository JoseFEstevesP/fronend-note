import { useEffect, useState } from 'react';
import useDelete from '../hooks/useDelete';
import { useGet } from '../hooks/useGet';
import Btn from './btn';
import { IconDelete, IconUpdate } from './Icons';
const TableRowTeacher = ({ data, setData, handelOpen, setNewData }) => {
	const { handelGet } = useGet();
	const { deleteData } = useDelete({ urlDefault: '/teacher/', setData });
	const { uid, uidTeacher, courseUid, sectionUid } = data;
	const [user, setUser] = useState('');
	const [section, setSection] = useState('');
	const [course, setCourse] = useState('');
	useEffect(() => {
		handelGet(`/user/${uidTeacher}`)
			.then(res => setUser(res.name))
			.catch(err => console.error(err));
		handelGet(`/section/${sectionUid}`)
			.then(res => setSection(res.name))
			.catch(err => console.error(err));
		handelGet(`/course/${courseUid}`)
			.then(res => setCourse(res.name))
			.catch(err => console.error(err));
	}, [data]);

	const handleDelete = () => deleteData(uid);
	const handleUpdate = () => {
		handelOpen();
		setNewData({ uid, uidTeacher, courseUid, sectionUid });
	};
	return (
		<tr>
			<td className='table__td'>{user}</td>
			<td className='table__td'>{section}</td>
			<td className='table__td'>{course}</td>
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
export default TableRowTeacher;
