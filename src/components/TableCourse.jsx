import { useEffect, useState } from 'react';
import { pathUrl } from '../constant/url';
import useLists from '../hooks/useLists';
import FormRegisterCourse from './FormRegisterCourse';
import FormUpdateCourse from './FormUpdateCourse';
import TableRowCourse from './TableRowCourse';
import './table.css';
const TableCourse = ({ setLoading, isOpen }) => {
	const [newData, setNewData] = useState(null);
	const { data, setData, handleLists } = useLists({
		urlDefault: `${pathUrl}/course/lists`,
	});
	useEffect(() => handleLists(), []);
	return (
		<section className='table table--modal'>
			<h2 className='table__title'>Materia</h2>
			{newData ? (
				<FormUpdateCourse
					setData={setData}
					newData={newData}
					setNewData={setNewData}
					setLoading={setLoading}
					isOpen={isOpen}
				/>
			) : (
				<FormRegisterCourse
					setData={setData}
					setLoading={setLoading}
					isOpen={isOpen}
				/>
			)}
			<table className='table__content'>
				<thead>
					<tr>
						<th className='table__th'>Nombre</th>
						<th className='table__th'>Código</th>
						<th className='table__th'>Acción</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, i) => (
						<TableRowCourse
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
export default TableCourse;
