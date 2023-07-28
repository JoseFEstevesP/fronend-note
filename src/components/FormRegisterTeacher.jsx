import { useEffect } from 'react';
import { useFormRegister } from '../hooks/useFormRegister';
import useLists from '../hooks/useLists';
import useSearch from '../hooks/useSearch';
import FormTeacher from './FormTeacher';
import './form.css';
const initForm = {
	uidTeacher: '',
	sectionUid: '',
	courseUid: '',
};
const FormRegisterTeacher = ({ handelClose, isOpen, setData, setLoading }) => {
	const {
		form,
		errors,
		loading,
		response,
		handleChange,
		handleSubmit,
		setForm,
		setErrors,
	} = useFormRegister({ defaultUrl: '/teacher/register', setData, initForm });
	const { data: dataRol, handleLists: handleListsRol } = useLists({
		urlDefault: `${import.meta.env.VITE_URL}/rol/lists`,
	});
	const { data: dataSection, handleLists: handleListsSection } = useLists({
		urlDefault: `${import.meta.env.VITE_URL}/section/lists`,
	});
	const { data: dataCourse, handleLists: handleListsCourse } = useLists({
		urlDefault: `${import.meta.env.VITE_URL}/course/lists`,
	});
	const { handleListsSearch, data } = useSearch({});
	useEffect(() => {
		if (!isOpen) {
			setForm(initForm);
			setErrors([]);
		}
	}, [isOpen]);
	useEffect(() => {
		if (isOpen) {
			handleListsRol();
			handleListsSection();
			handleListsCourse();
		}
	}, [isOpen]);
	useEffect(() => {
		if (dataRol) {
			dataRol?.forEach(item => {
				if (item.name === 'profesor') {
					handleListsSearch({
						url: `${import.meta.env.VITE_URL}/user/search/${item.uid}`,
					});
				}
			});
		}
	}, [dataRol]);
	useEffect(() => {
		handelClose();
	}, [response]);
	useEffect(() => {
		setLoading(loading);
	}, [loading]);
	return (
		<FormTeacher
			dataSection={dataSection}
			dataCourse={dataCourse}
			data={data}
			form={form}
			errors={errors}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
			response={response}
		/>
	);
};
export default FormRegisterTeacher;
