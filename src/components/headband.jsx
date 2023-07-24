import './headband.css';
const Headband = ({ classStyle = '' }) => (
	<img
		className={`headband ${classStyle}`}
		src='/assets/encabezado.png'
		alt='cintillo de la UNEXCA'
	/>
);
export default Headband;
