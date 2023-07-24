import { useEffect } from 'react';
import { useUpdate } from '../hooks/useUpdate';
import FormCourse from './FormCourse';
const initForm = {
	uid: '',
	name: '',
	code: '',
};
const FormUpdateCourse = ({
	setData,
	newData,
	setNewData,
	setLoading,
	isOpen,
}) => {
	const { handleChange, errors, setForm, loading, updateData, response, form } =
		useUpdate('/course/update-data', initForm, setData);
	useEffect(() => {
		if (!isOpen) {
			setNewData(null);
		}
	}, [isOpen]);
	useEffect(() => {
		if (newData) {
			setForm(newData);
		}
	}, [newData]);
	useEffect(() => {
		if (response) {
			setForm(initForm);
			setNewData(null);
		}
	}, [response]);
	useEffect(() => {
		setLoading(loading);
	}, [loading]);
	const handleSubmit = e => updateData(e);
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
export default FormUpdateCourse;
