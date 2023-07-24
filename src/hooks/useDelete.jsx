import { useCallback, useContext, useState } from 'react';
import { fetchData } from '../helpers/fetch';
import { pathUrl } from '../constant/url';
import { userToken } from '../context/userToken';

const useDelete = ({ urlDefault = '', setData }) => {
	const { token } = useContext(userToken);
	const [msg, setMsg] = useState({});
	const [error, setError] = useState([]);
	const deleteData = useCallback(uid => {
		fetchData()
			.del({
				url: `${pathUrl}${urlDefault}${uid}`,
				options: {
					headers: {
						'Content-type': 'application/json',
						authorization: `Bearer ${token}`,
					},
				},
			})
			.then(res => {
				if (res.error) {
					setError(res.error);
				} else if (res.msg) {
					setMsg(res.msg);
					setData(data => data.filter(item => item.uid !== uid));
				}
			})
			.catch(err => console.error(err));
	}, []);
	return { deleteData, msg, error };
};
export default useDelete;
