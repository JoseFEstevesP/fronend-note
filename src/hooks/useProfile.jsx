import { useCallback, useContext } from 'react';
import { fetchData } from '../helpers/fetch';
import { userToken } from '../context/userToken';
import { pathUrl } from '../constant/url';

export const useProfile = () => {
	const { token } = useContext(userToken);
	const handelProfile = useCallback(() => {
		return fetchData().get({
			url: `${pathUrl}/user/profile`,
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
