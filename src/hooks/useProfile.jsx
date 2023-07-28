import { useCallback, useContext } from 'react';
import { userToken } from '../context/userToken';
import { fetchData } from '../helpers/fetch';

export const useProfile = () => {
	const { token } = useContext(userToken);
	const handelProfile = useCallback(() => {
		return fetchData().get({
			url: `${import.meta.env.VITE_URL}/user/profile`,
			options: {
				headers: {
					'Content-type': 'application/json',
					authorization: `Bearer ${token}`,
				},
			},
		});
	}, []);
	return { handelProfile };
};
