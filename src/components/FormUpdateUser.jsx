import { useEffect } from 'react';
import { pathUrl } from '../constant/url';
import useLists from '../hooks/useLists';
import { useUpdate } from '../hooks/useUpdate';
import FormUser from './FormUser';
const initForm = {
	uid: '',
	ci: '',
	name: '',
	surname: '',
	email: '',
	rolUid: '',
};
const FormUpdateUser = ({ setData, newData, setNewData, setLoading }) => {
	const { handleChange, errors, setForm, loading, updateData, response, form } =
		useUpdate('/user/updateData', initForm, setData);
	const { data: dataRol, handleLists: handleListsRol } = useLists({
		urlDefault: `${pathUrl}/rol/lists`,
	});
	useEffect(() => {
		handleListsRol();
	}, []);
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
		<FormUser
			dataRol={dataRol}
			errors={errors}
			form={form}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
			response={response}
			passwordOptions={false}
		/>
	);
};
export default FormUpdateUser;
