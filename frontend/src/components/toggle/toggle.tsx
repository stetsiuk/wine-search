import React, { FC, PropsWithChildren } from 'react';

interface ToggleProps {
	togglePosition?: 'left' | 'right',
	text: string
}

const Toggle: FC<PropsWithChildren<ToggleProps>> = ({togglePosition = 'left', text}) => {
	return (
		<div className='toggle'>
			<div className='toggle__btn'/>
			<span className='toggle__text'>{text}</span>
		</div>
	);
};

export default Toggle;