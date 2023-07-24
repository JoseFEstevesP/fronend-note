import { useEffect, useState } from 'react';
import { pathUrl } from '../constant/url';
import useLists from '../hooks/useLists';
import useModal from '../hooks/useModal';
import FormRegisterUser from './FormRegisterUser';
import FormUpdateUser from './FormUpdateUser';
import { IconAdd, IconRol } from './Icons';
import Modal from './Modal';
import TableRol from './TableRol';
import TableRow from './TableRowUser';
import Btn from './btn';
import './table.css';
const TableUser = () => {
	const { data, setData, handleLists } = useLists({
		urlDefault: `${pathUrl}/user/lists`,
	});
	const [newData, setNewData] = useState(null);
	const {
		modal: modalRegisterUser,
		handelOpen: handelOpenRegisterUser,
		handelClose: handelCloseRegisterUser,
		loading: loadingRegisterUser,
		setLoading: setLoadingRegisterUser,
	} = useModal();
	const {
		modal: modalUpdateUser,
		handelOpen: handelOpenUpdateUser,
		handelClose: handelCloseUpdateUser,
		loading: loadingUpdateUser,
		setLoading: setLoadingUpdateUser,
	} = useModal();
	const {
		modal: modalRol,
		handelOpen: handelOpenRol,
		handelClose: handelCloseRol,
		loading: loadingRol,
		setLoading: setLoadingRol,
	} = useModal();
	useEffect(() => handleLists(), []);
	return (
		<section className='table'>
			<Modal
				isOpen={modalRegisterUser}
				handelClose={handelCloseRegisterUser}
				loading={loadingRegisterUser}
				Icon={<IconAdd />}
			>
				<FormRegisterUser
					isOpen={modalRegisterUser}
					setLoading={setLoadingRegisterUser}
					setData={setData}
					handelClose={handelCloseRegisterUser}
				/>
			</Modal>
			{newData && (
				<Modal
					loading={loadingUpdateUser}
					isOpen={modalUpdateUser}
					handelClose={handelCloseUpdateUser}
					Icon={<IconAdd />}
				>
					<FormUpdateUser
						setLoading={setLoadingUpdateUser}
						setData={setData}
						newData={newData}
						setNewData={setNewData}
						handelClose={handelCloseUpdateUser}
					/>
				</Modal>
			)}
			<Modal
				isOpen={modalRol}
				handelClose={handelCloseRol}
				loading={loadingRol}
				Icon={<IconRol />}
			>
				<TableRol isOpen={modalRol} setLoading={setLoadingRol} />
			</Modal>
			<h2 className='table__title'>Usuarios</h2>
			<div className='table__contentBtn'>
				<Btn
					title='Boton de añadir usuario'
					classStyle='table__btnAdd'
					handelClick={handelOpenRegisterUser}
				>
					Añadir usuarios <IconAdd classStyle='table__icon' />
				</Btn>
				<Btn
					title='Boton de rol'
					classStyle='table__btnAdd'
					handelClick={handelOpenRol}
				>
					Rol <IconRol classStyle='table__icon' />
				</Btn>
			</div>
			<table className='table__content'>
				<thead>
					<tr>
						<th className='table__th'>CI</th>
						<th className='table__th'>Nombre</th>
						<th className='table__th'>Apellido</th>
						<th className='table__th'>Correo</th>
						<th className='table__th'>Rol</th>
						<th className='table__th'>Acción</th>
					</tr>
				</thead>
				<tbody>
					{data?.map((item, i) => (
						<TableRow
							handelOpen={handelOpenUpdateUser}
							key={i}
							data={item}
							setData={setData}
							setNewData={setNewData}
						/>
					))}
				</tbody>
			</table>
		</section>
	);
};
export default TableUser;
