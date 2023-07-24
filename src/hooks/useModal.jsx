import { useState } from 'react';

const useModal = () => {
	const [modal, setModal] = useState(false);
	const handelOpen = () => setModal(true);
	const handelClose = () => setModal(false);
	const [loading, setLoading] = useState(false);

	return {
		modal,
		handelOpen,
		handelClose,
		loading,
		setLoading,
	};
};
export default useModal;
