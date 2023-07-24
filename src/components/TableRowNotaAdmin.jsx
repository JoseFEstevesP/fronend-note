import { useEffect, useState } from 'react';
import useDelete from '../hooks/useDelete';
import { useGet } from './../hooks/useGet';
import { IconDelete, IconNote } from './Icons';
import Btn from './btn';
const TableRowNotaAdmin = ({ data, setData, setNewData, handelOpen }) => {
	const [dataUser, setDataUser] = useState({});
	const { deleteData } = useDelete({ urlDefault: '/note/', setData });
	const { handelGet } = useGet();

	useEffect(() => {
		handelGet(`/user/${data.uidStudent}`).then(res =>
			setDataUser(prevData => ({
				...prevData,
				student: `CI:${res.ci}, ${res.name} ${res.surname}`,
			}))
		);
		handelGet(`/user/${data.uidTeacher}`).then(res =>
			setDataUser(prevData => ({
				...prevData,
				teacher: `CI:${res.ci}, ${res.name} ${res.surname}`,
			}))
		);
		handelGet(`/section/${data.sectionUid}`).then(res =>
			setDataUser(prevData => ({ ...prevData, section: res.name }))
		);
		handelGet(`/course/${data.courseUid}`).then(res =>
			setDataUser(prevData => ({
				...prevData,
				course: `${res.name} / ${res.code}`,
			}))
		);
	}, [data]);
	const handleNote = () => {
		setNewData({
			uid: data.uid,
			note: JSON.parse(data?.rating?.replace(/'/g, '"')),
		});
		handelOpen();
	};
	const handleNoteDelete = () => deleteData(data.uid);
	return (
		<tr>
			<td className='table__td'>{dataUser.student}</td>
			<td className='table__td'>{dataUser.teacher}</td>
			<td className='table__td'>{dataUser.section}</td>
			<td className='table__td'>{dataUser.course}</td>
			<td className='table__td'>
				<div className='table__btnActions'>
					<Btn
						handelClick={handleNote}
						classStyle='table__btn table__btn--add'
						title='botón de agregar o modificar nota'
					>
						<IconNote classStyle='table__icon' />
					</Btn>
					<Btn
						handelClick={handleNoteDelete}
						classStyle='table__btn table__btn--delete'
						title='botón de eliminar nota'
					>
						<IconDelete classStyle='table__icon' />
					</Btn>
				</div>
			</td>
		</tr>
	);
};
export default TableRowNotaAdmin;
