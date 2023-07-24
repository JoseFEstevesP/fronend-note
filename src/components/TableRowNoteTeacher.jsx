import { useContext, useEffect, useState } from 'react';
import { pathUrl } from '../constant/url';
import { userToken } from '../context/userToken';
import { fetchData } from '../helpers/fetch';
import { useGet } from '../hooks/useGet';
import { IconDetail, IconNote } from './Icons';
import Btn from './btn';
const TableRowNoteTeacher = ({
	data,
	handelOpen,
	setNewDate,
	setNote,
	handelOpenNote,
}) => {
	const { token } = useContext(userToken);
	const { ci, name, surname, uidTeacher, courseUid, uidStudent, sectionUid } =
		data;
	const [dataNam, setDataNam] = useState({ sectionName: '', courseName: '' });
	const { handelGet: courseName } = useGet();
	const { handelGet: sectionName } = useGet();
	const [signal, setSignal] = useState(true);
	const [rating, setRating] = useState([]);
	useEffect(() => {
		courseName(`/course/${courseUid}`).then(res => {
			return setDataNam(prevData => ({ ...prevData, courseName: res.name }));
		});
		sectionName(`/section/${sectionUid}`).then(res => {
			return setDataNam(prevData => ({ ...prevData, sectionName: res.name }));
		});
	}, []);
	useEffect(() => {
		fetchData()
			.get({
				url: `${pathUrl}/note/searchFilterNote?uidTeacher=${uidTeacher}&courseUid=${courseUid}&uidStudent=${uidStudent}&sectionUid=${sectionUid}`,
				options: {
					headers: {
						'Content-type': 'application/json',
						authorization: `Bearer ${token}`,
					},
				},
			})
			.then(res => {
				if (res.signal && res.note) {
					setRating(JSON.parse(res?.note?.rating?.replace(/'/g, '"')));
				}
				setSignal(res.signal);
			});
	}, [data]);
	const handelNoteAdd = () => {
		handelOpen();
		setNewDate({
			uidTeacher,
			courseUid,
			uidStudent,
			sectionUid,
			rating: [],
		});
	};
	const handleDetail = () => {
		setNote(rating);
		handelOpenNote();
	};
	return (
		<tr>
			<td className='table__td'>{ci}</td>
			<td className='table__td'>{name}</td>
			<td className='table__td'>{surname}</td>
			<td className='table__td'>{dataNam.sectionName}</td>
			<td className='table__td'>{dataNam.courseName}</td>
			<td className='table__td'>
				<div className='table__btnActions'>
					{signal || (
						<Btn
							title='botón agregar nota'
							classStyle='table__btn table__btn--add'
							handelClick={handelNoteAdd}
						>
							<IconNote />
						</Btn>
					)}
					{rating.length > 0 ? (
						<Btn
							title='botón detalles de la nota del usuario'
							classStyle='table__btn'
							handelClick={handleDetail}
						>
							<IconDetail />
						</Btn>
					) : (
						''
					)}
				</div>
			</td>
		</tr>
	);
};
export default TableRowNoteTeacher;
