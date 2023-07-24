import { useContext, useState } from 'react';
import { fetchData } from '../helpers/fetch';
import { userToken } from '../context/userToken';
import { userData } from '../context/userDataUser';
import { pathUrl } from '../constant/url';

export const useFormLogin = initialForm => {
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
		errors,
		loading,
		response,
		handleChange,
		handleSubmit,
	};
};
