import { useEffect } from 'react';
import useLists from '../hooks/useLists';
import useSearch from '../hooks/useSearch';
import { useUpdate } from '../hooks/useUpdate';
import FormStudent from './FormStudent';

const initForm = {
	uid: '',
	uidStudent: '',
	sectionUid: '',
	courseUid: '',
};
const FormUpdateStudent = ({
	setData,
	newData,
	setNewData,
	handelClose,
	isOpen,
	setLoading,
}) => {
	const { handleChange, errors, setForm, loading, updateData, response, form } =
		useUpdate('/student/update-data', initForm, setData);
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
		handleListsRol();
		handleListsSection();
		handleListsCourse();
	}, []);
	useEffect(() => {
		dataRol.forEach(item => {
			if (item.name === 'estudiante') {
				handleListsSearch({
					url: `${import.meta.env.VITE_URL}/user/search/${item.uid}`,
				});
			}
		});
	}, [dataRol]);
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
			handelClose();
			setForm(initForm);
			setNewData(null);
		}
	}, [response]);
	useEffect(() => {
		setLoading(loading);
	}, [loading]);
	const handleSubmit = e => updateData(e);
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
export default FormUpdateStudent;
