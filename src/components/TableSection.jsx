import { useEffect, useState } from 'react';
import { pathUrl } from '../constant/url';
import useLists from '../hooks/useLists';
import FormRegisterSection from './FormRegisterSection';
import FormUpdateSection from './FormUpdateSection';
import TableRowSection from './TableRowSection';
const TableSection = ({ isOpen, setLoading }) => {
	const [newData, setNewData] = useState(null);
	const { data, setData, handleLists } = useLists({
		urlDefault: `${pathUrl}/section/lists`,
	});
	useEffect(() => handleLists(), []);
	return (
		<section className='table table--modal'>
			<h2 className='table__title'>Sección</h2>
			{newData ? (
				<FormUpdateSection
					setData={setData}
					newData={newData}
					setNewData={setNewData}
					setLoading={setLoading}
					isOpen={isOpen}
				/>
			) : (
				<FormRegisterSection
					setData={setData}
					isOpen={isOpen}
					setLoading={setLoading}
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
					{data.map((item, i) => (
						<TableRowSection
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
export default TableSection;
