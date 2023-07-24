import { IconCode, IconCourse, IconSubmit } from './Icons';
import Input from './Input';
import Btn from './btn';
import './form.css';

const FormCourse = ({ errors, form, handleChange, handleSubmit, response }) => {
	const nameErr = errors.filter(error => error.name);
	const codeErr = errors.filter(error => error.code);
	return (
		<form className='form form--modal' onSubmit={handleSubmit}>
			<Input
				handleChange={handleChange}
				response={response}
				Icon={IconCourse}
				errors={nameErr}
				name='name'
				placeholder='Nombre...'
				value={form.name}
			/>
			<Input
				handleChange={handleChange}
				response={response}
				Icon={IconCode}
				errors={codeErr}
				name='code'
				placeholder='Codigo de la materia...'
				value={form.code}
			/>
			<Btn type='submit' classStyle='form__btn' title='registrar materia'>
				Enviar <IconSubmit classStyle='form__iconSubmit' />
			</Btn>
		</form>
	);
};
export default FormCourse;
