import React, { FC, PropsWithChildren } from 'react';

import './shopResult.scss';

import {mockdata} from './mockdata';
import ShopItem from './shop-item/shopItem';



const ShopResult: FC<PropsWithChildren> = () => {

	return (
		<div className='shop-result'>
			{mockdata.multipleMatch.map((item, index) => <ShopItem key={index} type='multiple' name={item.name} wines={item.wines}/>)}
			{mockdata.singleMatch.map((item, index) => <ShopItem key={index} type='single' name={item.name} wines={item.wines}/>)}
		</div>
	);
};

export default ShopResult;