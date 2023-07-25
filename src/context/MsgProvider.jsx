import { createContext, useState } from 'react';

export const userMsg = createContext();
const MsgProvider = ({ children }) => {
	const [msg, setMsg] = useState(null);
	return (
		<userMsg.Provider value={{ msg, setMsg }}>{children}</userMsg.Provider>
	);
};
export default MsgProvider;
