import { useCallback, useContext, useState } from 'react';
import { pathUrl } from '../constant/url';
import { userMsg } from '../context/MsgProvider';
import { userToken } from '../context/userToken';
import { fetchData } from '../helpers/fetch';

const useDelete = ({ urlDefault = '', setData }) => {
	const { setMsg } = useContext(userMsg);
	const { token } = useContext(userToken);
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
				}
				if (res) {
					setMsg({ ...res, type: false });
					setData(data => data.filter(item => item.uid !== uid));
				}
			})
			.catch(err => console.error(err));
	}, []);
	return { deleteData, error };
};
export default useDelete;
