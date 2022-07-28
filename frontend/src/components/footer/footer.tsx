import React, { FC, PropsWithChildren } from 'react';

import './footer.scss';


const Footer: FC<PropsWithChildren> = () => {


	return (
		<div className='footer'>
			<div className='footer__info'>
				<div className='footer__contact'>
					<div className='footer__item'>Name / Firma</div>
					<div className='footer__item'>Adresse</div>
					<div className='footer__item'>Hausnummer</div>
					<div className='footer__item'>e-Mail Adresse</div>
				</div>
				<div className='footer__policy'>
					<div className='footer__item'>Imprint</div>
					<div className='footer__item'>Privacy Policy</div>
					<div className='footer__item'>AGB & Data Security</div>
				</div>
				<div className='footer__social'>
					<div className='footer__social__title'>Social Media</div>
				</div>
			</div>
			<div className='footer__links'>
				<div className='footer__link'>Impressum</div>
				<div className='footer__divider'/>
				<div className='footer__link'>Datenschutzerklärung</div>
				<div className='footer__divider'/>
				<div className='footer__link'>Datenschutzerklärung</div>
			</div>
		</div>
	);
};

export default Footer;