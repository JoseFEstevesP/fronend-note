import { useState } from 'react';
import BtnTheme from './BtnTheme';
import FormLogin from './FormLogin';
import './login.css';
import { IconUser, Logo } from './Icons';

const Login = () => {
	const [loading, setLoading] = useState(false);
	return (
		<section className='login'>
			<div className='login__iconUser'>
				<h1
					className='login__logo'
					title='Sistema para la gestión de carga de notas'
				>
					<Logo classStyle='login__logoIcon' />
				</h1>
				{loading ? 'Cargando...' : <IconUser />}
			</div>
			<BtnTheme classStyle='login__btnTheme' />
			<FormLogin setLoading={setLoading} />
		</section>
	);
};
export default Login;
