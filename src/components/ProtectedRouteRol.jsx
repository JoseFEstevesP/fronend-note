import { useContext } from 'react';
import { userToken } from '../context/userToken';
import { userData } from '../context/userDataUser';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRouteRol = ({ children, rolCompared }) => {
	const { token } = useContext(userToken);
	const { dataUser } = useContext(userData);
	if (!!token && dataUser.rolName === rolCompared) {
		return children || <Outlet />;
	} else {
		return <Navigate to='/404' />;
	}
};
