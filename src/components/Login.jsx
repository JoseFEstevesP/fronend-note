import { useState } from 'react';
import BtnTheme from './BtnTheme';
import FormLogin from './FormLogin';
import './login.css';
import { IconUser } from './Icons';

const Login = () => {
	const [loading, setLoading] = useState(false);
	return (
		<section className='login'>
			<div className='login__iconUser'>
				{loading ? 'Cargando...' : <IconUser />}
			</div>
			<BtnTheme classStyle='login__btnTheme' />
			<FormLogin setLoading={setLoading} />
		</section>
	);
};
export default Login;
