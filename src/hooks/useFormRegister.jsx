import { useContext, useState } from 'react';
import uuid4 from 'uuid4';
import { userMsg } from '../context/MsgProvider';
import { userToken } from '../context/userToken';
import { fetchData } from '../helpers/fetch';
export const useFormRegister = ({ defaultUrl, setData, initForm }) => {
	const { setMsg } = useContext(userMsg);
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
				url: `${import.meta.env.VITE_URL}${defaultUrl}`,
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
					setMsg({ ...res.errors[0], type: false });
					setLoading(false);
					return setErrors(res.errors);
				}
				if (res) {
					setMsg({ ...res, type: true });
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
				url: `${import.meta.env.VITE_URL}${defaultUrl}`,
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
					setMsg({ ...res.errors[0], type: false });
					setLoading(false);
					return setErrors(res.errors);
				}
				if (res) {
					setMsg({ ...res, type: true });
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
