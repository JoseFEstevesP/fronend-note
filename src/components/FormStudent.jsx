import { IconCourse, IconSection, IconStudent, IconSubmit } from './Icons';
import Selects from './Selects';
import Btn from './btn';
import './form.css';
const FormStudent = ({
	handleSubmit,
	form,
	handleChange,
	response,
	data,
	dataCourse,
	dataSection,
	errors,
}) => {
	const uidStudentErr = errors.filter(error => error.uidTeacher);
	const sectionUidErr = errors.filter(error => error.sectionUid);
	const courseUidErr = errors.filter(error => error.courseUid);
	return (
		<form className='form' onSubmit={handleSubmit}>
			<Selects
				title='seleccionar estudiante'
				name='uidStudent'
				value={form.uidStudent}
				handleChange={handleChange}
				response={response}
				errors={uidStudentErr}
				Icon={IconStudent}
			>
				<option value={''} disabled hidden>
					Seleccione estudiante
				</option>
				{data.map((item, i) => (
					<option key={i} value={item.uid}>
						{`CI: ${item.ci}, ${item.name} ${item.surname}`}
					</option>
				))}
			</Selects>
			<Selects
				title='seleccionar materia'
				name='courseUid'
				value={form.courseUid}
				handleChange={handleChange}
				response={response}
				errors={courseUidErr}
				Icon={IconCourse}
			>
				<option value={''} disabled hidden>
					Seleccione la materia
				</option>
				{dataCourse.map((item, i) => (
					<option key={i} value={item.uid}>
						{item.name}
					</option>
				))}
			</Selects>
			<Selects
				title='seleccionar sección'
				name='sectionUid'
				value={form.sectionUid}
				handleChange={handleChange}
				response={response}
				errors={sectionUidErr}
				Icon={IconSection}
			>
				<option value={''} disabled hidden>
					Seleccione la sección
				</option>
				{dataSection.map((item, i) => (
					<option key={i} value={item.uid}>
						{item.name}
					</option>
				))}
			</Selects>
			<Btn type='submit' classStyle='form__btn' title='Registrar profesor'>
				Enviar
				<IconSubmit classStyle='form__iconSubmit' />
			</Btn>
		</form>
	);
};
export default FormStudent;
