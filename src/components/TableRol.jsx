import { useEffect, useState } from 'react';
import { pathUrl } from '../constant/url';
import useLists from '../hooks/useLists';
import FormRegisterRol from './FormRegisterRol';
import FormUpdateRol from './FormUpdateRol';
import TableRowRol from './TableRowRol';
import './table.css';
const TableRol = ({ setLoading, isOpen }) => {
	const [newData, setNewData] = useState(null);
	const {
		data: dataRol,
		setData: setDataRol,
		handleLists: handleListsRol,
	} = useLists({
		urlDefault: `${pathUrl}/rol/lists`,
	});

	useEffect(() => handleListsRol(), []);
	return (
		<section className='table table--modal'>
			<h2 className='table__title'>Rol</h2>
			{newData ? (
				<FormUpdateRol
					setData={setDataRol}
					newData={newData}
					setNewData={setNewData}
					setLoading={setLoading}
					isOpen={isOpen}
				/>
			) : (
				<FormRegisterRol
					isOpen={isOpen}
					setLoading={setLoading}
					setData={setDataRol}
				/>
			)}
			<table className='table__content'>
				<thead>
					<tr>
						<th className='table__th'>Nombre</th>
						<th className='table__th'>Acción</th>
					</tr>
				</thead>
				<tbody>
					{dataRol?.map((item, i) => (
						<TableRowRol
							key={i}
							data={item}
							setData={setDataRol}
							setNewData={setNewData}
						/>
					))}
				</tbody>
			</table>
		</section>
	);
};
export default TableRol;
