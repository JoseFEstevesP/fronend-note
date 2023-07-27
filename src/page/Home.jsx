import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../components/Login';
import Headband from '../components/headband';
import { userToken } from '../context/userToken';
import './home.css';
const Home = ({ handelOpen }) => {
	const { token } = useContext(userToken);
	if (token) return <Navigate to='/options' />;
	return (
		<article className='home'>
			<Headband />
			<Login handelOpen={handelOpen} />
		</article>
	);
};
export default Home;
