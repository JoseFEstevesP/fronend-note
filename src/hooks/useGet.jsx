import { useCallback, useContext } from 'react';
import { fetchData } from '../helpers/fetch';
import { userToken } from '../context/userToken';
import { pathUrl } from '../constant/url';

export const useGet = urlRol => {
	const { token } = useContext(userToken);
	const handelGet = useCallback(
		url => {
			return fetchData().get({
				url: `${pathUrl}${url === '' ? urlRol : url}`,
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
