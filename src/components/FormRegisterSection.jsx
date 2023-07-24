import { useEffect } from 'react';
import { useFormRegister } from '../hooks/useFormRegister';
import FormSection from './FormSection';
import './form.css';
const initForm = {
	name: '',
};
const FormRegisterSection = ({ setData, isOpen, setLoading }) => {
	const {
		form,
		errors,
		setForm,
		setErrors,
		loading,
		response,
		handleChange,
		handleSubmit,
	} = useFormRegister({ defaultUrl: '/section/register', setData, initForm });
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
		<FormSection
			form={form}
			errors={errors}
			response={response}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
		/>
	);
};
export default FormRegisterSection;
