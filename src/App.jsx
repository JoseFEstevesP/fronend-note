import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ProtectedRouteRol } from './components/ProtectedRouteRol';
import { userData } from './context/userDataUser';
import { userToken } from './context/userToken';
import Administrador from './page/Admin';
import Error404 from './page/Error404';
import Home from './page/Home';
import NoteStudent from './page/NoteStudent';
import Options from './page/Options';
import Teacher from './page/Teacher';
const App = () => {
	const [token, setToken] = useState(sessionStorage.getItem('token'));
	const [dataUser, setDataUser] = useState(
		sessionStorage.getItem('dataUser')
			? JSON.parse(sessionStorage.getItem('dataUser'))
			: ''
	);
	return (
		<userToken.Provider value={{ token, setToken }}>
			<userData.Provider value={{ dataUser, setDataUser }}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route element={<ProtectedRoute />}>
						<Route path='/options' element={<Options />} />
						<Route element={<ProtectedRouteRol rolCompared='administrador' />}>
							<Route path='/admin/*' element={<Administrador />} />
						</Route>
						<Route element={<ProtectedRouteRol rolCompared='profesor' />}>
							<Route path='/teacher/*' element={<Teacher />} />
						</Route>
						<Route element={<ProtectedRouteRol rolCompared='estudiante' />}>
							<Route path='/student/*' element={<NoteStudent />} />
						</Route>
					</Route>
					<Route path='*' element={<Error404 />} />
				</Routes>
			</userData.Provider>
		</userToken.Provider>
	);
};
export default App;
