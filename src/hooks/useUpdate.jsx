import { useContext, useState } from 'react';
import { pathUrl } from '../constant/url';
import { userToken } from '../context/userToken';
import { fetchData } from '../helpers/fetch';

export const useUpdate = (urlDefault, initForm, setData) => {
	const [form, setForm] = useState(initForm);
	const [errors, setErrors] = useState([]);
	const [msg, setMsg] = useState({});
	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState(false);
	const { token } = useContext(userToken);
	const handleChange = e => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};
	const updateData = e => {
		e.preventDefault();
		setLoading(true);
		fetchData()
			.put({
				url: `${pathUrl}${urlDefault}`,
				options: {
					headers: {
						'Content-type': 'application/json',
						authorization: `Bearer ${token}`,
					},
					body: form,
				},
			})
			.then(res => {
				if (res.error) return setErrors(res.error);
				setData(prevData =>
					prevData.map(item => (item.uid === form.uid ? form : item))
				);
				setMsg(res.msg);
				setForm(initForm);
				setResponse(true);
				setTimeout(() => setResponse(false), 1000);
			})
			.catch(err => console.error(err))
			.finally(() => setLoading(false));
	};
	const updateDataNote = () => {
		setLoading(true);
		fetchData()
			.put({
				url: `${pathUrl}${urlDefault}`,
				options: {
					headers: {
						'Content-type': 'application/json',
						authorization: `Bearer ${token}`,
					},
					body: form,
				},
			})
			.then(res => {
				if (res.errors) {
					setLoading(false);
					return setErrors(res.errors);
				}
				if (res) {
					setErrors([]);
					setLoading(false);
					setMsg(res.msg);
					setForm(initForm);
					setResponse(true);
					setTimeout(() => setResponse(false), 1000);
				}
			})
			.catch(err => {
				setForm(initForm);
				setLoading(false);
				console.error(err);
			})
			.finally(() => setLoading(false));
	};
	return {
		updateDataNote,
		handleChange,
		updateData,
		loading,
		response,
		form,
		setForm,
		errors,
		msg,
	};
};
