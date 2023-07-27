import { useContext, useEffect, useState } from 'react';
import { userMsg } from '../context/MsgProvider';
import { IconClose } from './Icons';
import Btn from './btn';
import './msgFetch.css';
const MsgSuccessfully = () => {
	const { msg } = useContext(userMsg);
	const [msgText, setMsgText] = useState('');
	const [isMsg, setIsMsg] = useState(false);
	const handelClose = () => {
		setIsMsg(false);
	};
	useEffect(() => {
		if (msg && (msg.msg || msg.uid || msg.msgNote)) {
			setIsMsg(true);
			setMsgText(msg.msg || msg.msgNote || msg.uid);
		}
		const timer = setTimeout(() => setIsMsg(false), 4000);
		return () => clearTimeout(timer);
	}, [msg]);
	return (
		<>
			<div
				className={`msgFetch ${msg && isMsg ? 'msgFetch-show' : ''} 
				${msg && msg?.type ? 'msgFetch--correct' : 'msgFetch--incorrect'}`}
			>
				<div className='msgFetch__content'>
					{msg && <p className='msgFetch__msg'>{msgText}</p>}
					<Btn
						title='botón cerrar mensaje'
						classStyle='msgFetch__closeMsg'
						handelClick={handelClose}
					>
						<IconClose />
					</Btn>
				</div>
			</div>
		</>
	);
};
export default MsgSuccessfully;
