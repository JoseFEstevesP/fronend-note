import { useCallback, useContext, useState } from 'react';
import { fetchData } from '../helpers/fetch';
import { userToken } from '../context/userToken';

const useLists = ({ urlDefault }) => {
	const { token } = useContext(userToken);
	const [url, setUrl] = useState('');
	const [data, setData] = useState([]);
	const handleLists = useCallback(() => {
		fetchData()
			.get({
				url: url === '' ? urlDefault : url,
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
	return { handleLists, data, setUrl, setData, url };
};
export default useLists;
