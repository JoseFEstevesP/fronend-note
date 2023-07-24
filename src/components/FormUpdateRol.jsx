import { useEffect } from 'react';
import { useUpdate } from '../hooks/useUpdate';
import FormRol from './FormRol';
import './form.css';
const initForm = {
	uid: '',
	name: '',
};
const FormUpdateRol = ({
	setData,
	newData,
	setNewData,
	setLoading,
	isOpen,
}) => {
	const { handleChange, errors, setForm, loading, updateData, response, form } =
		useUpdate('/rol/update-data', initForm, setData);
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
		form && (
			<FormRol
				form={form}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				errors={errors}
				response={response}
			/>
		)
	);
};
export default FormUpdateRol;
