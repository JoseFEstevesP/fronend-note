import { IconCorrect, IconIncorrect } from './Icons';

const Selects = ({
	handleChange,
	value,
	errors,
	response,
	Icon,
	children,
	title,
	name,
}) => {
	return (
		<div className='form__contentInput'>
			<div className='form__gupInput'>
				<select
					className='form__input'
					title={title}
					name={name}
					onChange={handleChange}
					value={value}
				>
					{children}
				</select>
				<div className='form__icon'>
					<Icon
						classStyle={errors.length > 0 || response ? 'form__iconHidden' : ''}
					/>
					{errors.length > 0 && (
						<IconIncorrect classStyle='form__iconIncorrect' />
					)}
					{response && <IconCorrect classStyle='form__iconCorrect' />}
				</div>
			</div>
			{errors.length > 0 &&
				errors.map((msg, i) => {
					return (
						<p className='form__msg' key={i}>
							{msg[name]}
						</p>
					);
				})}
		</div>
	);
};
export default Selects;
