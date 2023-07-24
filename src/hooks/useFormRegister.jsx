import { useContext, useState } from 'react';
import uuid4 from 'uuid4';
import { pathUrl } from '../constant/url';
import { userToken } from '../context/userToken';
import { fetchData } from '../helpers/fetch';
export const useFormRegister = ({ defaultUrl, setData, initForm }) => {
	const { token } = useContext(userToken);
	const [form, setForm] = useState(initForm);
	const [errors, setErrors] = useState([]);
	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState(null);
	const handleChange = e => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};
	const uuid = () => {
		const uid = uuid4();
		return uuid4.valid(uid) ? uid : uuid();
	};
	const handleSubmit = e => {
		e.preventDefault();
		const formPost = { uid: uuid(), ...form };
		setLoading(true);
		fetchData()
			.post({
				url: `${pathUrl}${defaultUrl}`,
				options: {
					headers: {
						'Content-type': 'application/json',
						authorization: `Bearer ${token}`,
					},
					body: formPost,
				},
			})
			.then(res => {
				if (res.errors) {
					setLoading(false);
					return setErrors(res.errors);
				}
				if (res) {
					setErrors([]);
					setForm(initForm);
					setLoading(false);
					setResponse(true);
					setTimeout(() => setResponse(false), 3000);
					setData(data => [...data, formPost]);
				}
			})
			.catch(err => {
				setForm(initForm);
				setLoading(false);
				console.error(err);
			});
	};
	const handleSubmitNote = () => {
		const formPost = { uid: uuid(), ...form };
		setLoading(true);
		fetchData()
			.post({
				url: `${pathUrl}${defaultUrl}`,
				options: {
					headers: {
						'Content-type': 'application/json',
						authorization: `Bearer ${token}`,
					},
					body: formPost,
				},
			})
			.then(res => {
				if (res.errors) {
					setLoading(false);
					return setErrors(res.errors);
				}
				if (res) {
					setErrors([]);
					setForm(initForm);
					setLoading(false);
					setResponse(true);
					setTimeout(() => setResponse(false), 3000);
				}
			})
			.catch(err => {
				setForm(initForm);
				setLoading(false);
				console.error(err);
			});
	};
	return {
		errors,
		form,
		handleChange,
		handleSubmit,
		handleSubmitNote,
		loading,
		response,
		setErrors,
		setForm,
	};
};
