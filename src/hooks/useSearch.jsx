import { useCallback, useContext, useState } from 'react';
import { fetchData } from '../helpers/fetch';
import { userToken } from '../context/userToken';

const useSearch = ({ urlDefault = '' }) => {
	const { token } = useContext(userToken);
	const [data, setData] = useState([]);
	const handleListsSearch = useCallback(({ url }) => {
		fetchData()
			.get({
				url: urlDefault || url,
				options: {
					headers: {
						'Content-type': 'application/json',
						authorization: `Bearer ${token}`,
					},
				},
			})
			.then(res => {
				setData(res);
			})
			.catch(err => console.error(err));
	}, []);
	return { handleListsSearch, data, setData };
};
export default useSearch;
