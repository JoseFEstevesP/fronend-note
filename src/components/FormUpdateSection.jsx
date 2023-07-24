import { useEffect } from 'react';
import { useUpdate } from '../hooks/useUpdate';
import FormSection from './FormSection';

const initForm = {
	uid: '',
	name: '',
};
const FormUpdateSection = ({
	setData,
	newData,
	setNewData,
	setLoading,
	isOpen,
}) => {
	const { handleChange, errors, setForm, loading, updateData, response, form } =
		useUpdate('/section/update-data', initForm, setData);
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
		<FormSection
			form={form}
			errors={errors}
			response={response}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
		/>
	);
};
export default FormUpdateSection;
