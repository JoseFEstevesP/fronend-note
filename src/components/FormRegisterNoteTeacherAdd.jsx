import { useContext, useEffect, useState } from 'react';
import { userMsg } from '../context/MsgProvider';
import { useFormRegister } from '../hooks/useFormRegister';
import useModal from '../hooks/useModal';
import {
	IconCorrect,
	IconDelete,
	IconIncorrect,
	IconPercentage,
	IconPoints,
	IconSubmit,
	IconTask,
	IconUpdate,
} from './Icons';
import { InputNote } from './Input';
import Modal from './Modal';
import Btn from './btn';
import './confirm.css';
import './form.css';
import './formNote.css';
import './table.css';
const initForm = {
	rating: '',
	uidStudent: '',
	uidTeacher: '',
	sectionUid: '',
	courseUid: '',
};
const initNote = {
	activity: '',
	pointsActivity: '',
	percentageActivity: '',
	points: {},
	percentage: '',
};
const initialRating = [];
const FormRegisterNoteTeacherAdd = ({
	isOpen,
	handelClose,
	newDate,
	handleLists,
	setLoading,
}) => {
	const { setMsg } = useContext(userMsg);
	const [points, setPoints] = useState({});
	const [rating, setRating] = useState(initialRating);
	const [msgNote, setMsgNote] = useState(false);
	const [isNote, setIsNote] = useState(false);
	const {
		handelClose: handelCloseMsg,
		handelOpen: handelOpenMsg,
		modal: modalMsg,
	} = useModal();
	const { loading, response, setForm, form, handleSubmitNote } =
		useFormRegister({
			defaultUrl: '/note/register',
			initForm,
		});
	useEffect(() => {
		if (newDate) {
			setRating(newDate.rating);
		}
	}, [newDate]);
	useEffect(() => {
		setLoading(loading);
	}, [loading]);
	useEffect(() => {
		setPoints({
			pointsActivity: rating?.reduce(
				(a, b) => Number(a) + Number(b.pointsActivity),
				0
			),
			percentageActivity: rating?.reduce(
				(a, b) => Number(a) + Number(b.percentageActivity),
				0
			),
			point: rating?.reduce((a, b) => Number(a) + Number(b.points), 0),
			percentage: rating?.reduce((a, b) => Number(a) + Number(b.percentage), 0),
		});
		newDate.rating = rating;
	}, [rating]);
	const [noteChanged, setNoteChanged] = useState(initNote);
	const handleChange = e => {
		const { name, value } = e.target;
		setNoteChanged({ ...noteChanged, [name]: value });
	};
	useEffect(() => {
		if (form?.rating?.length > 0) {
			handleSubmitNote();
		}
	}, [form]);
	useEffect(() => {
		if (response) {
			handelClose();
			handleLists();
			setMsgNote(false);
		}
	}, [response]);
	useEffect(() => {
		if (!isOpen) {
			setIsNote(false);
			setNoteChanged(initNote);
		}
	}, [isOpen]);
	const handleMsg = () => {
		if (points.pointsActivity === 20 && points.percentageActivity === 100) {
			setMsgNote(true);
			handelOpenMsg();
		} else {
			setMsg({
				msgNote: 'Los puntos tienen que ser de 20Pts y los porcentaje de 100%',
				type: false,
			});
		}
	};
	const submitNote = () => {
		const { rating, uidStudent, uidTeacher, sectionUid, courseUid } = newDate;
		if (msgNote && rating?.length > 0) {
			handelCloseMsg();
			setForm({
				rating: JSON.stringify(rating).replace(/"/g, "'"),
				uidStudent,
				uidTeacher,
				sectionUid,
				courseUid,
			});
		}
	};
	const handleNoteDelete = id => {
		setRating(prevData => prevData.filter((_, index) => index !== id));
	};
	const handleNoteUpdate = id => {
		setNoteChanged(rating[id]);
		setRating(prevData => prevData.filter((_, index) => index !== id));
	};
	const handleSubmit = e => {
		e.preventDefault();
		const validateEmpty = Object.values(noteChanged).every(item => item === '');
		if (!validateEmpty) {
			setIsNote(true);
			setRating(prevData => [...prevData, noteChanged]);
			setNoteChanged(initNote);
		}
	};
	const pointsBoolean =
		points.pointsActivity >= 20 ||
		points.percentageActivity >= 100 ||
		points.point >= 20 ||
		points.percentage >= 100;
	return (
		<>
			<div
				className={`formNote ${pointsBoolean ? 'formNote--deleteTable' : ''} ${
					!isNote ? 'formNote--deleteForm' : ''
				}`}
			>
				<Modal
					handelClose={handelCloseMsg}
					isOpen={modalMsg}
					classNameModal='modal--bgNone'
					classNameContent='modal__content--msg'
					Icon={<IconIncorrect classStyle='table__btn--delete' />}
				>
					<article className='confirm'>
						<h3 className='confirm__title'>
							Asegúrese de tener toda la nota antes de subirla
						</h3>
						<Btn
							classStyle='confirm__btn'
							title={`mensaje de error: Asegúrese de tener toda la nota antes de subirla`}
							handelClick={submitNote}
						>
							Confirmar <IconCorrect classStyle='confirm__icon' />
						</Btn>
					</article>
				</Modal>
				{pointsBoolean ? (
					''
				) : (
					<form className='form form--note' onSubmit={handleSubmit}>
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
								min='0'
								max='20'
							/>
							<InputNote
								type='number'
								name='percentageActivity'
								placeholder='% actividad...'
								handleChange={handleChange}
								value={noteChanged.percentageActivity}
								Icon={IconPercentage}
								min='0'
								max='100'
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
								min='0'
								max='20'
							/>
							<InputNote
								type='number'
								placeholder='% estudiante...'
								name='percentage'
								handleChange={handleChange}
								value={noteChanged.percentage}
								Icon={IconPercentage}
								min='0'
								max='100'
							/>
						</div>
						<Btn
							type='submit'
							classStyle='table__btnAdd table__btnAdd--width'
							title='Crear nota'
						>
							Crear nota
						</Btn>
					</form>
				)}
				{isNote && (
					<section className='table table--note'>
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
								{rating?.map((item, i) => {
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
							</tbody>
							<tfoot>
								<tr>
									<th className='table__td'>Total</th>
									<td className='table__td'>{points.pointsActivity}</td>
									<td className='table__td'>{points.percentageActivity}%</td>
									<td className='table__td'>{points.point} </td>
									<td className='table__td'>{points.percentage}%</td>
								</tr>
							</tfoot>
						</table>
					</section>
				)}
				{rating?.length > 0 && (
					<Btn
						classStyle='form__btn'
						title='Subir notas'
						handelClick={handleMsg}
					>
						Cargar nota <IconSubmit classStyle='form__icon' />
					</Btn>
				)}
			</div>
		</>
	);
};
export default FormRegisterNoteTeacherAdd;
