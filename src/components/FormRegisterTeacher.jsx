import { useEffect } from 'react';
import { pathUrl } from '../constant/url';
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
		urlDefault: `${pathUrl}/rol/lists`,
	});
	const { data: dataSection, handleLists: handleListsSection } = useLists({
		urlDefault: `${pathUrl}/section/lists`,
	});
	const { data: dataCourse, handleLists: handleListsCourse } = useLists({
		urlDefault: `${pathUrl}/course/lists`,
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
						url: `${pathUrl}/user/search/${item.uid}`,
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
