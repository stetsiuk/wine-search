import React, { FC, PropsWithChildren } from 'react';

import Header from '../../components/header/header';
import Button from '../../components/button/button';
import Toggle from '../../components/toggle/toggle';
import Filter from '../../components/filter/filter';
import './wines.scss';

import ShopResult from '../../components/shop-result/shopResult';

const WinesPage: FC<PropsWithChildren> = () => {

	const mockFilterData = [
		{name: 'Vignoble Arbeau', producer: 'Je suis à boire - 2020', year: ['2020', '2019', '2018'], litres: ['0.375', '0.75', '1.5']},
		{name: 'Landbau Kraemer', producer: '', year: [], litres: [] },
		{name: 'La Coulée de Serrant', producer: 'Les Vieux clos', year: [], litres: []}
	]

	return (
		<>
			<Header backText='back to search'/>

			<div className='wines'>
				<div className='wines__filter'>
					<div className='wines__title'>
						<h2 className='wines__title__text'>You've searched:</h2>
					</div>

					<Filter mockData={mockFilterData}/>

				</div>
				<div className='wines__result'>
					<div className='wines__title'>
						<div className='wines__title__head'>
							<h2 className='wines__title__text'>And we found:</h2>
							<Button type='medium' text='New Search'/>
						</div>

						<Toggle text='combine shops for the best result'/>
					</div>

					<ShopResult/>
				</div>
			</div>
		</>
	);
};

export default WinesPage;