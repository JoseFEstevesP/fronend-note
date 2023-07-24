import { useContext } from 'react';
import { userToken } from '../context/userToken';
import { userData } from '../context/userDataUser';

const useExit = () => {
	const { setToken } = useContext(userToken);
	const { setDataUser } = useContext(userData);
	const handelClickExit = () => {
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('dataUser');
		setToken('');
		setDataUser('');
	};
	return { handelClickExit };
};
export default useExit;
