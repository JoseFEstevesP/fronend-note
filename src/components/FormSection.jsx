import { IconSection, IconSubmit } from './Icons';
import Input from './Input';
import Btn from './btn';

const FormSection = ({
	handleSubmit,
	handleChange,
	response,
	errors,
	form,
}) => {
	const nameErr = errors.filter(error => error.name);
	return (
		<form className='form form--modal' onSubmit={handleSubmit}>
			<Input
				handleChange={handleChange}
				response={response}
				Icon={IconSection}
				errors={nameErr}
				name='name'
				placeholder='Sección...'
				value={form.name}
			/>
			<Btn type='submit' classStyle='form__btn' title='registrar sección'>
				Enviar <IconSubmit classStyle='form__iconSubmit' />
			</Btn>
		</form>
	);
};
export default FormSection;
