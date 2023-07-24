import { IconRol, IconSubmit } from './Icons';
import Input from './Input';
import Btn from './btn';
import './form.css';
const initForm = {
	name: '',
};
const FormRol = ({
	handleSubmit,
	handleChange,
	form = initForm,
	errors,
	response,
}) => {
	const nameErr = errors?.filter(error => error.name);
	return (
		<>
			<form className='form form--modal' onSubmit={handleSubmit}>
				<Input
					handleChange={handleChange}
					response={response}
					Icon={IconRol}
					errors={nameErr}
					name='name'
					placeholder='Nombre...'
					value={form.name}
				/>
				<Btn type='submit' classStyle='form__btn' title='Registrar rol'>
					Enviar
					<IconSubmit classStyle='form__iconSubmit' />
				</Btn>
			</form>
		</>
	);
};
export default FormRol;
