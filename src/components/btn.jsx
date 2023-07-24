import './btn.css';
const Btn = ({
	classStyle,
	type = 'button',
	title,
	children,
	handelClick,
	disabled = false,
}) => {
	if (handelClick) {
		return (
			<button
				type={type}
				title={title}
				className={`btn ${classStyle}`}
				onClick={handelClick}
				disabled={disabled}
			>
				{children}
			</button>
		);
	}
	return (
		<button type={type} title={title} className={`btn ${classStyle}`}>
			{children}
		</button>
	);
};
export default Btn;
