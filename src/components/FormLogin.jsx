import { useEffect } from 'react';
import { useFormLogin } from '../hooks/useFormLogin';
import { IconCI, IconPass, IconSubmit } from './Icons';
import Input from './Input';
import Btn from './btn';
import './form.css';
const initForm = {
	ci: '',
	password: '',
};
const FormLogin = ({ setLoading }) => {
	const { form, errors, loading, response, handleChange, handleSubmit } =
		useFormLogin(initForm);
	const passErr = errors.filter(error => error.password);
	const ciErr = errors.filter(error => error.ci);
	useEffect(() => {
		setLoading(loading);
	}, [loading]);
	return (
		<>
			<form className='form' onSubmit={handleSubmit}>
				<Input
					errors={ciErr}
					handleChange={handleChange}
					Icon={IconCI}
					name='ci'
					placeholder='CI...'
					response={response}
					type='number'
					value={form.ci}
				/>
				<Input
					handleChange={handleChange}
					response={response}
					Icon={IconPass}
					errors={passErr}
					name='password'
					placeholder='Contraseña...'
					value={form.password}
					type='password'
				/>
				<Btn type='submit' classStyle='form__btn' title='iniciar sesión'>
					Enviar <IconSubmit classStyle='form__iconSubmit' />
				</Btn>
			</form>
		</>
	);
};
export default FormLogin;
