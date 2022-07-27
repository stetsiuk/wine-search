import React, { FC, PropsWithChildren } from 'react';

import FilterItem from './filterItem/filterItem';
import './filter.scss';

interface FilterProps {
	mockData: any[]
}

const Filter: FC<PropsWithChildren<FilterProps>> = ({mockData}) => {

	return (
		<div className='filter'>
			{mockData && mockData.map((item, index) => (
				<FilterItem
					key={index}
					name={item.name}
					producer={item.producer}
					year={item.year}
					litres={item.litres}
				/>
			))}
		</div>
	);
};

export default Filter;