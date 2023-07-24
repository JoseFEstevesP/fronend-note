import Btn from './btn';
import './form.css';
import { useFormLogin } from '../hooks/useFormLogin';
import {
	IconCI,
	IconCorrect,
	IconIncorrect,
	IconPass,
	IconSubmit,
} from './Icons';
import { useEffect } from 'react';
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
				<div className='form__contentInput'>
					<div className='form__gupInput'>
						<input
							className='form__input'
							type='number'
							name='ci'
							placeholder='CI...'
							onChange={handleChange}
							value={form.ci}
							required
						/>
						<div className='form__icon'>
							<IconCI
								classStyle={
									ciErr.length > 0 || response ? 'form__iconHidden' : ''
								}
							/>
							{ciErr.length > 0 && (
								<IconIncorrect classStyle='form__iconIncorrect' />
							)}
							{response && <IconCorrect classStyle='form__iconCorrect' />}
						</div>
					</div>
					{ciErr.length > 0 &&
						ciErr.map((msg, i) => {
							return (
								<p className='form__msg' key={i}>
									{msg.ci}
								</p>
							);
						})}
				</div>
				<div className='form__contentInput'>
					<div className='form__gupInput'>
						<input
							className='form__input'
							type='password'
							name='password'
							placeholder='Contraseña...'
							onChange={handleChange}
							value={form.password}
							required
						/>
						<div className='form__icon'>
							<IconPass
								classStyle={
									passErr.length > 0 || response ? 'form__iconHidden' : ''
								}
							/>
							{passErr.length > 0 && (
								<IconIncorrect classStyle='form__iconIncorrect' />
							)}
							{response && <IconCorrect classStyle='form__iconCorrect' />}
						</div>
					</div>
					{passErr.length > 0 &&
						passErr.map((msg, i) => {
							return (
								<p className='form__msg' key={i}>
									{msg.ci}
								</p>
							);
						})}
				</div>
				<Btn type='submit' classStyle='form__btn' title='iniciar sesión'>
					Enviar <IconSubmit classStyle='form__iconSubmit' />
				</Btn>
			</form>
		</>
	);
};
export default FormLogin;
