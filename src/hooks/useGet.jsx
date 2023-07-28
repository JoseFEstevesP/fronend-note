import { useCallback, useContext } from 'react';
import { userToken } from '../context/userToken';
import { fetchData } from '../helpers/fetch';

export const useGet = urlRol => {
	const { token } = useContext(userToken);
	const handelGet = useCallback(
		url => {
			return fetchData().get({
				url: `${import.meta.env.VITE_URL}${url === '' ? urlRol : url}`,
				options: {
					headers: {
						'Content-type': 'application/json',
						authorization: `Bearer ${token}`,
					},
				},
			});
		},
		[urlRol]
	);
	return { handelGet };
};
