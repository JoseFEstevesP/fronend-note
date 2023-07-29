import { useEffect, useState } from 'react';
import { IconDark, IconLight } from './Icons';
const BtnTheme = ({ classStyle }) => {
	const themeDefault = window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'Light';
	const themeDefaultLocal =
		localStorage.getItem('theme') === null
			? themeDefault
			: localStorage.getItem('theme');
	const [theme, setTheme] = useState(themeDefaultLocal);
	useEffect(() => {
		localStorage.setItem('theme', theme);
		setTheme(localStorage.getItem('theme'));
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);
	const iconTheme = {
		light: <IconLight />,
		dark: <IconDark />,
	};
	const handleClick = () => setTheme(theme === 'light' ? 'dark' : 'light');
	return (
		<button
			type='button'
			title={`botón de tema ${theme}`}
			className={classStyle}
			onClick={handleClick}
		>
			{iconTheme[theme]}
		</button>
	);
};

export default BtnTheme;
