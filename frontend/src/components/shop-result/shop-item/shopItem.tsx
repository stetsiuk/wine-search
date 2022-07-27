import React, { FC, PropsWithChildren } from 'react';

import ShopWine from '../shop-wine/shopWine';
import './shopItem.scss';

interface ShopItemProps {
	type: 'multiple' | 'single'
	name: string
	wines: any[]
}

const ShopItem: FC<PropsWithChildren<ShopItemProps>> = ({type, name, wines}) => {
	return (
		<div className='shop-item'>
			<div className='shop-item__header'>
				<div className='shop-item__name'>{name}</div>
				<div className={`shop-item__found shop-item__found--${type}`}>
					{type === 'multiple' && '3 of 3 wines found'}
					{type === 'single' && '1 of 3 wines found'}
				</div>

				<div className='shop-item__main'>
					{wines && wines.map((item, index) => <ShopWine key={index} wine={item}/>)}
				</div>
			</div>
		</div>
	);
};

export default ShopItem;