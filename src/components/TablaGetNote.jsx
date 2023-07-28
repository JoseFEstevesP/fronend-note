const TablaGetNote = ({ note }) => {
	return (
		<table className='table__content'>
			<thead>
				<tr>
					<th className='table__th'>Actividad</th>
					<th className='table__th'>Act/Ptos</th>
					<th className='table__th'>Act/%</th>
					<th className='table__th'>Es/Ptos</th>
					<th className='table__th'>Es/%</th>
				</tr>
			</thead>
			<tbody>
				{note?.map((item, i) => (
					<tr key={i}>
						<td className='table__td'>{item.activity}</td>
						<td className='table__td'>{item.pointsActivity}</td>
						<td className='table__td'>{item.percentageActivity}%</td>
						<td className='table__td'>{item.points}</td>
						<td className='table__td'>{item.percentage}%</td>
					</tr>
				))}
			</tbody>
			<tfoot>
				<tr>
					<th className='table__td'>Total</th>
					<td className='table__td'>
						{note?.reduce((a, b) => Number(a) + Number(b.pointsActivity), 0)}
					</td>
					<td className='table__td'>
						{note?.reduce(
							(a, b) => Number(a) + Number(b.percentageActivity),
							0
						)}
						%
					</td>
					<td className='table__td'>
						{note?.reduce((a, b) => Number(a) + Number(b.points), 0)}
					</td>
					<td className='table__td'>
						{note?.reduce((a, b) => Number(a) + Number(b.percentage), 0)}%
					</td>
				</tr>
			</tfoot>
		</table>
	);
};
export default TablaGetNote;
