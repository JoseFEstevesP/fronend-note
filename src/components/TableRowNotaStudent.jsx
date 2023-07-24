import { useEffect, useState } from 'react';
import { useGet } from '../hooks/useGet';
import { IconDetail } from './Icons';
import Btn from './btn';
const TableRowNotaStudent = ({ data, handelOpen, setDetails }) => {
	const { sectionUid, courseUid, uidTeacher, rating } = data;
	const [dataStudent, setDataStudent] = useState({});
	const { handelGet } = useGet();
	useEffect(() => {
		handelGet(`/section/${sectionUid}`).then(res =>
			setDataStudent(prevData => ({ ...prevData, section: res.name }))
		);
		handelGet(`/course/${courseUid}`).then(res =>
			setDataStudent(prevData => ({ ...prevData, course: res.name }))
		);
		handelGet(`/user/${uidTeacher}`).then(res =>
			setDataStudent(prevData => ({
				...prevData,
				teacher: `${res.name} ${res.surname}`,
			}))
		);
		const note = JSON.parse(rating.replace(/'/g, '"'));
		setDataStudent(prevData => ({ ...prevData, note }));
	}, [data]);
	const handleDetail = () => {
		handelOpen();
		setDetails(dataStudent?.note);
	};
	return (
		<tr>
			<td className='table__td'>{dataStudent.course}</td>
			<td className='table__td'>{dataStudent.teacher}</td>
			<td className='table__td'>{dataStudent.section}</td>
			<td className='table__td'>
				{`${dataStudent?.note?.reduce(
					(a, b) => Number(a) + Number(b.points),
					0
				)}/${dataStudent?.note?.reduce(
					(a, b) => Number(a) + Number(b.percentage),
					0
				)}%`}
			</td>
			<td className='table__td table__btnActions'>
				<Btn
					title='botón detalles de la nota del usuario'
					classStyle='table__btn'
					handelClick={handleDetail}
				>
					<IconDetail />
				</Btn>
			</td>
		</tr>
	);
};
export default TableRowNotaStudent;
