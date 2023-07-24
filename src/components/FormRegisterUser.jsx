import { useEffect } from 'react';
import { pathUrl } from '../constant/url';
import { useFormRegister } from '../hooks/useFormRegister';
import useLists from '../hooks/useLists';
import FormUser from './FormUser';
const initForm = {
	ci: '',
	name: '',
	surname: '',
	email: '',
	password: '',
	rolUid: '',
};
const FormRegisterUser = ({ setData, handelClose, setLoading, isOpen }) => {
	const {
		form,
		setForm,
		errors,
		setErrors,
		loading,
		response,
		handleChange,
		handleSubmit,
	} = useFormRegister({
		defaultUrl: '/user/register',
		setData,
		initForm,
	});
	const { data: dataRol, handleLists: handleListsRol } = useLists({
		urlDefault: `${pathUrl}/rol/lists`,
	});
	useEffect(() => {
		if (!isOpen) {
			setForm(initForm);
			setErrors([]);
		}
	}, [isOpen]);
	useEffect(() => {
		handleListsRol();
	}, []);
	useEffect(() => {
		handelClose();
	}, [response]);
	useEffect(() => {
		setLoading(loading);
	}, [loading]);
	return (
		<FormUser
			dataRol={dataRol}
			errors={errors}
			form={form}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
			response={response}
		/>
	);
};
export default FormRegisterUser;
