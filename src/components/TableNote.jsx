import { useEffect, useState } from 'react';
import { pathUrl } from '../constant/url';
import useLists from '../hooks/useLists';
import useModal from '../hooks/useModal';
import { useUpdate } from '../hooks/useUpdate';
import {
	IconDelete,
	IconPercentage,
	IconPoints,
	IconSubmit,
	IconTask,
	IconUpdate,
} from './Icons';
import { InputNote } from './Input';
import Modal from './Modal';
import TableRowNotaAdmin from './TableRowNotaAdmin';
import Btn from './btn';
import './table.css';
const initNote = {
	activity: '',
	pointsActivity: '',
	percentageActivity: '',
	points: '',
	percentage: '',
};
const initUpdate = {
	uid: '',
	rating: '',
};
const TableNote = () => {
	const [newData, setNewData] = useState({});
	const [note, setNote] = useState(null);
	const [noteChanged, setNoteChanged] = useState(initNote);
	const {
		modal,
		handelClose,
		handelOpen,
		setLoading,
		loading: loadingModal,
	} = useModal();
	const { data, setData, handleLists } = useLists({
		urlDefault: `${pathUrl}/note/lists`,
	});
	const { form, setForm, updateDataNote, response, loading } = useUpdate(
		'/note/update-data',
		initUpdate
	);
	useEffect(() => {
		if (newData?.note?.length > 0) {
			setNote(newData.note);
		}
	}, [newData]);
	useEffect(() => {
		handleLists();
	}, []);
	useEffect(() => {
		if (response) {
			setForm(initUpdate);
			setNewData({ uid: '', note: '' });
			setNote([]);
			handleLists();
			handelClose();
		}
	}, [response]);
	useEffect(() => {
		setLoading(loading);
	}, [loading]);
	useEffect(() => {
		if (note?.length >= 0) {
			setForm({
				uid: newData.uid,
				rating:
					note?.length === 0
						? JSON.stringify(newData.note).replace(/"/g, "'")
						: JSON.stringify(note).replace(/"/g, "'"),
			});
		}
	}, [note]);
	const handleChange = e => {
		const { name, value } = e.target;
		setNoteChanged({ ...noteChanged, [name]: value });
	};
	const handleNoteDelete = id => {
		setNote(prevData => prevData.filter((_, index) => index !== id));
	};
	const handleNoteUpdate = id => {
		setNoteChanged(note[id]);
		setNote(prevData => prevData.filter((_, index) => index !== id));
	};
	const handleSubmit = e => {
		e.preventDefault();
		const validateEmpty = Object.values(noteChanged).every(item => item === '');
		if (!validateEmpty) {
			setNote(prevData => [...prevData, noteChanged]);
			setNoteChanged(initNote);
		}
	};
	const handleSubmitNote = () => {
		if (form) {
			updateDataNote();
			setNoteChanged(initNote);
		}
	};
	return (
		<section className='table'>
			{note && (
				<Modal isOpen={modal} handelClose={handelClose} loading={loadingModal}>
					<dev className='formNote'>
						<form className='form' onSubmit={handleSubmit}>
							<InputNote
								name='activity'
								placeholder='Actividad...'
								handleChange={handleChange}
								value={noteChanged.activity}
								Icon={IconTask}
							/>
							<div className='form__group'>
								<InputNote
									type='number'
									name='pointsActivity'
									placeholder='Ptos actividad...'
									handleChange={handleChange}
									value={noteChanged.pointsActivity}
									Icon={IconPoints}
								/>
								<InputNote
									type='number'
									name='percentageActivity'
									placeholder='% actividad...'
									handleChange={handleChange}
									value={noteChanged.percentageActivity}
									Icon={IconPercentage}
								/>
							</div>
							<div className='form__group'>
								<InputNote
									type='number'
									placeholder='Ptos estudiante...'
									name='points'
									handleChange={handleChange}
									value={noteChanged.points}
									Icon={IconPoints}
								/>
								<InputNote
									type='number'
									placeholder='% estudiante...'
									name='percentage'
									handleChange={handleChange}
									value={noteChanged.percentage}
									Icon={IconPercentage}
								/>
							</div>
							<Btn type='submit' classStyle='table__btnAdd' title='Crear nota'>
								Crear nota
							</Btn>
						</form>
						<table className='table__content'>
							<thead>
								<tr>
									<th className='table__th'>Actividad</th>
									<th className='table__th'>Act/ptos</th>
									<th className='table__th'>Act/%</th>
									<th className='table__th'>Es/ptos</th>
									<th className='table__th'>Es/%</th>
									<th className='table__th'>Acción</th>
								</tr>
							</thead>
							<tbody>
								{note?.map((item, i) => {
									return (
										<tr key={i}>
											<td className='table__td'>{item.activity}</td>
											<td className='table__td'>{item.pointsActivity}</td>
											<td className='table__td'>{item.percentageActivity}%</td>
											<td className='table__td'>{item.points}</td>
											<td className='table__td'>{item.percentage}%</td>
											<td className='table__td'>
												<Btn
													title='botón eliminar actividad'
													classStyle='table__btn table__btn--delete'
													handelClick={() => handleNoteDelete(i)}
												>
													<IconDelete />
												</Btn>
												<Btn
													title='botón actualizar actividad'
													classStyle='table__btn table__btn--update'
													handelClick={() => handleNoteUpdate(i)}
												>
													<IconUpdate />
												</Btn>
											</td>
										</tr>
									);
								})}
								<tr>
									<td className='table__td'>Total</td>
									<td className='table__td'>
										{note?.reduce(
											(a, b) => Number(a) + Number(b.pointsActivity),
											0
										)}
									</td>
									<td className='table__td'>
										{note?.reduce(
											(a, b) => Number(a) + Number(b.percentageActivity),
											0
										)}
										%
									</td>
									<td className='table__td'>
										{note?.reduce((a, b) => Number(a) + Number(b.points), 0)}
									</td>
									<td className='table__td'>
										{note?.reduce(
											(a, b) => Number(a) + Number(b.percentage),
											0
										)}
										%
									</td>
								</tr>
							</tbody>
						</table>
						<Btn
							classStyle='form__btn'
							title='Subir notas'
							handelClick={handleSubmitNote}
						>
							Cargar nota <IconSubmit classStyle='form__icon' />
						</Btn>
					</dev>
				</Modal>
			)}
			<h2 className='table__title'>Nota</h2>
			<table className='table__content'>
				<thead>
					<tr>
						<th className='table__th'>Estudiante</th>
						<th className='table__th'>Profesor</th>
						<th className='table__th'>Sección</th>
						<th className='table__th'>Materia</th>
						<th className='table__th'>Nota</th>
					</tr>
				</thead>
				<tbody>
					{data?.map((item, i) => (
						<TableRowNotaAdmin
							key={i}
							data={item}
							setData={setData}
							setNewData={setNewData}
							handelOpen={handelOpen}
						/>
					))}
				</tbody>
			</table>
		</section>
	);
};
export default TableNote;
