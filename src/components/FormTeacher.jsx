import { IconCourse, IconSection, IconSubmit, IconTeacher } from './Icons';
import Selects from './Selects';
import Btn from './btn';
import './form.css';
const FormTeacher = ({
	handleSubmit,
	form,
	handleChange,
	response,
	data,
	dataCourse,
	dataSection,
	errors,
}) => {
	const uidTeacherErr = errors.filter(error => error.uidTeacher);
	const sectionUidErr = errors.filter(error => error.sectionUid);
	const courseUidErr = errors.filter(error => error.courseUid);
	return (
		<form className='form' onSubmit={handleSubmit}>
			<Selects
				title='seleccionar profesor'
				name='uidTeacher'
				value={form.uidTeacher}
				handleChange={handleChange}
				response={response}
				errors={uidTeacherErr}
				Icon={IconTeacher}
			>
				<option value={''} disabled hidden>
					Seleccione profesor
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
export default FormTeacher;
