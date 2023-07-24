import { useEffect } from 'react';
import { pathUrl } from '../constant/url';
import useLists from '../hooks/useLists';
import useSearch from '../hooks/useSearch';
import { useUpdate } from '../hooks/useUpdate';
import FormTeacher from './FormTeacher';

const initForm = {
	uid: '',
	uidTeacher: '',
	sectionUid: '',
	courseUid: '',
};
const FormUpdateTeacher = ({
	setData,
	newData,
	setNewData,
	handelClose,
	setLoading,
	isOpen,
}) => {
	const { handleChange, errors, setForm, loading, updateData, response, form } =
		useUpdate('/teacher/update-data', initForm, setData);
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
		handleListsRol();
		handleListsSection();
		handleListsCourse();
	}, []);
	useEffect(() => {
		dataRol.forEach(item => {
			if (item.name === 'profesor') {
				handleListsSearch({
					url: `${pathUrl}/user/search/${item.uid}`,
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
export default FormUpdateTeacher;
