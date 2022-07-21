import React, { FC, PropsWithChildren } from 'react';

import './button.scss';

interface ButtonProps {
	type: 'small' | 'medium' | 'large'
	onClick?: () => void;
	disabled?: boolean;
	text?: string;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({type, onClick, disabled, text, children}) => {
	return (
		<button disabled={disabled} onClick={onClick} className={`button button__${type}`}>
			{text}
			{children}
		</button>
	);
};

export default Button;