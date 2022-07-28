import React, { FC, PropsWithChildren } from 'react';

import BackButton from '../button/back-button/backButton';
import './header.scss';

interface HeaderProps {
	backText: string
}

const Header: FC<PropsWithChildren<HeaderProps>> = ({backText}) => {
	return (
		<>
			<div className='header'>
				<h1 className='header__title'>WEINE SUCHEN</h1>
			</div>
			<BackButton text={backText}/>
		</>
	);
};

export default Header;