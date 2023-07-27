import { useContext, useState } from 'react';
import { pathUrl } from '../constant/url';
import { userMsg } from '../context/MsgProvider';
import { userData } from '../context/userDataUser';
import { userToken } from '../context/userToken';
import { fetchData } from '../helpers/fetch';

export const useFormLogin = initialForm => {
	const { setMsg } = useContext(userMsg);
	const { setToken } = useContext(userToken);
	const { setDataUser } = useContext(userData);
	const [form, setForm] = useState(initialForm);
	const [errors, setErrors] = useState([]);
	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState(null);
	const handleChange = e => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};
	const handleSubmit = e => {
		e.preventDefault();
		setLoading(true);
		fetchData()
			.post({
				url: `${pathUrl}/user/login`,
				options: {
					headers: {
						'Content-type': 'application/json',
					},
					body: form,
				},
			})
			.then(res => {
				if (res.errors) {
					setMsg({ ...res.errors[0], type: false });
					setLoading(false);
					return setErrors(res.errors);
				}
				if (res) {
					sessionStorage.setItem('token', res.JWT);
					setToken(res.JWT);
					setResponse(true);
					setForm(initialForm);
					setLoading(false);
					setErrors([]);
					setTimeout(() => setResponse(false), 5000);
					fetchData()
						.get({
							url: `${pathUrl}/user/profile`,
							options: {
								headers: {
									'Content-type': 'application/json',
									authorization: `Bearer ${res.JWT}`,
								},
							},
						})
						.then(res => {
							const { name, surname, rolName } = res;
							const dataUser = {
								name,
								surname,
								rolName,
							};
							sessionStorage.setItem('dataUser', JSON.stringify(dataUser));
							setDataUser(dataUser);
						})
						.catch(err => console.error(err));
				}
			})
			.catch(err => console.error(err));
	};
	return {
		form,
		setForm,
		errors,
		loading,
		response,
		handleChange,
		handleSubmit,
	};
};
