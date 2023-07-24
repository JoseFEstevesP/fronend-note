import { useEffect } from 'react';
import { pathUrl } from '../constant/url';
import { useFormRegister } from '../hooks/useFormRegister';
import useLists from '../hooks/useLists';
import useSearch from '../hooks/useSearch';
import FormStudent from './FormStudent';
const initForm = {
	uidStudent: '',
	sectionUid: '',
	courseUid: '',
};
const FormRegisterStudent = ({ setData, handelClose, isOpen, setLoading }) => {
	const {
		form,
		errors,
		loading,
		response,
		handleChange,
		handleSubmit,
		setForm,
		setErrors,
	} = useFormRegister({ defaultUrl: '/student/register', setData, initForm });
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
		if (isOpen) {
			handleListsRol();
			handleListsSection();
			handleListsCourse();
		}
	}, [isOpen]);
	useEffect(() => {
		if (!isOpen) {
			setForm(initForm);
			setErrors([]);
		}
	}, [isOpen]);
	useEffect(() => {
		dataRol.forEach(item => {
			if (item.name === 'estudiante') {
				handleListsSearch({
					url: `${pathUrl}/user/search/${item.uid}`,
				});
			}
		});
	}, [dataRol]);
	useEffect(() => {
		handelClose();
	}, [response]);
	useEffect(() => {
		setLoading(loading);
	}, [loading]);
	return (
		<FormStudent
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
export default FormRegisterStudent;
