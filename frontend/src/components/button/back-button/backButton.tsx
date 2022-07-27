import React, { FC, PropsWithChildren } from 'react';

import Icon from '../../icon/icon';
import './backButton.scss';

interface BackButtonProps {
	text?: string
}


const BackButton: FC<PropsWithChildren<BackButtonProps>> = ({text = 'back'}) => {
	return (
		<button className='back-btn'>
			<Icon type='chevron_left' size='20' fill='none'/>
			<span className='back-btn__text'>{text}</span>
		</button>
	);
};

export default BackButton;