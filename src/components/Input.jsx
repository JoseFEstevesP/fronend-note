import { IconCorrect, IconIncorrect } from './Icons';

const Input = ({
	errors = [],
	handleChange,
	Icon,
	name,
	placeholder,
	response,
	type = 'text',
	value,
}) => {
	return (
		<div className='form__contentInput'>
			<div className='form__gupInput'>
				<input
					className='form__input'
					type={type}
					name={name}
					placeholder={placeholder}
					onChange={handleChange}
					value={value}
					required
				/>
				<div className='form__icon'>
					<Icon
						classStyle={
							errors?.length > 0 || response ? 'form__iconHidden' : ''
						}
					/>
					{errors?.length > 0 && (
						<IconIncorrect classStyle='form__iconIncorrect' />
					)}
					{response && <IconCorrect classStyle='form__iconCorrect' />}
				</div>
			</div>
			{errors?.length > 0 &&
				errors?.map((msg, i) => {
					return (
						<p className='form__msg' key={i}>
							{msg[name]}
						</p>
					);
				})}
		</div>
	);
};
export const InputNote = ({
	handleChange,
	name,
	placeholder,
	type = 'text',
	value,
	Icon,
}) => {
	return (
		<div className='form__contentInput'>
			<div className='form__gupInput'>
				<input
					className='form__input'
					type={type}
					name={name}
					placeholder={placeholder}
					onChange={handleChange}
					value={value}
					required
				/>
				<div className='form__icon'>
					<Icon />
				</div>
			</div>
		</div>
	);
};
export default Input;
