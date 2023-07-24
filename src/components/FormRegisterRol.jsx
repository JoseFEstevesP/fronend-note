import { useEffect } from 'react';
import { useFormRegister } from '../hooks/useFormRegister';
import FormRol from './FormRol';
const initForm = {
	name: '',
};
const FormRegisterRol = ({ setData, setLoading, isOpen }) => {
	const {
		form,
		errors,
		loading,
		response,
		handleChange,
		handleSubmit,
		setForm,
		setErrors,
	} = useFormRegister({ defaultUrl: '/rol/register', setData, initForm });
	useEffect(() => {
		if (!isOpen) {
			setForm(initForm);
			setErrors([]);
		}
	}, [isOpen]);
	useEffect(() => {
		setLoading(loading);
	}, [loading]);
	return (
		<FormRol
			form={form}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
			errors={errors}
			response={response}
		/>
	);
};
export default FormRegisterRol;
