import { useEffect } from 'react';
import { useFormRegister } from '../hooks/useFormRegister';
import FormCourse from './FormCourse';
const initForm = {
	name: '',
	code: '',
};
const FormRegisterCourse = ({ setData, setLoading, isOpen }) => {
	const {
		errors,
		form,
		handleChange,
		handleSubmit,
		loading,
		response,
		setErrors,
		setForm,
	} = useFormRegister({ defaultUrl: '/course/register', setData, initForm });
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
		<FormCourse
			errors={errors}
			form={form}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
			response={response}
		/>
	);
};
export default FormRegisterCourse;
