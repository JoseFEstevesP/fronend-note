import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { userToken } from '../context/userToken';

export const ProtectedRoute = () => {
	const { token } = useContext(userToken);
	if (!token) return <Navigate to='/' />;
	return <Outlet />;
};
