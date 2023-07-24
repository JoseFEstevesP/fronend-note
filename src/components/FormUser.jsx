import {
	IconCI,
	IconEmail,
	IconPass,
	IconRol,
	IconSubmit,
	IconUser,
} from './Icons';
import Input from './Input';
import Selects from './Selects';
import Btn from './btn';
import './form.css';
const FormUser = ({
	dataRol,
	errors,
	form,
	handleChange,
	handleSubmit,
	response,
	passwordOptions = true,
}) => {
	const passErr = errors.filter(error => error.password);
	const ciErr = errors.filter(error => error.ci);
	const nameErr = errors.filter(error => error.name);
	const surnameErr = errors.filter(error => error.surname);
	const emailErr = errors.filter(error => error.email);
	const rolUidErr = errors.filter(error => error.uid);
	return (
		<form action='#' className='form' onSubmit={handleSubmit}>
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
				errors={nameErr}
				handleChange={handleChange}
				Icon={IconUser}
				name='name'
				placeholder='Nombre...'
				response={response}
				value={form.name}
			/>
			<Input
				handleChange={handleChange}
				Icon={IconUser}
				errors={surnameErr}
				name='surname'
				placeholder='Apellido...'
				response={response}
				value={form.surname}
			/>
			<Input
				handleChange={handleChange}
				Icon={IconEmail}
				errors={emailErr}
				name='email'
				placeholder='Correo...'
				response={response}
				value={form.email}
				type='email'
			/>
			{passwordOptions && (
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
			)}
			<Selects
				title='seleccionar rol'
				name='rolUid'
				handleChange={handleChange}
				value={form.rolUid}
				Icon={IconRol}
				errors={rolUidErr}
				response={response}
			>
				<option value={''} disabled hidden>
					Seleccione rol
				</option>
				{dataRol.map((item, i) => (
					<option key={i} value={item.uid}>
						{item.name}
					</option>
				))}
			</Selects>
			<Btn type='submit' classStyle='form__btn' title='Registrar usuario'>
				Enviar
				<IconSubmit classStyle='form__iconSubmit' />
			</Btn>
		</form>
	);
};
export default FormUser;
