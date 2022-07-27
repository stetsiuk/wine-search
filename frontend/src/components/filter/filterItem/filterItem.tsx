import React, { FC, PropsWithChildren, useEffect, useState } from 'react';

import Icon from '../../icon/icon';
import './filterItem.scss';

interface FilterItemProps {
	name: string,
	producer: string,
	year: string[],
	litres: string[]
}

const FilterItem: FC<PropsWithChildren<FilterItemProps>> = ({name, producer, year, litres}) => {
	const [isItemOpen, setIsItemOpen] = useState(true);
	const [isSwitchNeed, setIsSwitchNeed] = useState(true);

	useEffect(() => {
		if (!year.length || !litres.length) {
			setIsItemOpen(false)
			setIsSwitchNeed(true)
		}
	}, [])

	return (
		<div className='filter-item'>
			{isSwitchNeed && (
				<div className={`filter-item__switch filter-item__switch--${isItemOpen ? 'open' : 'close'}`}
					 onClick={() => setIsItemOpen(!isItemOpen)}
				>
					<Icon size='24' type={isItemOpen ? 'collapse' : 'expand'} />
				</div>
			)}

			<div className='filter-item__name'>{name}</div>
			<div className='filter-item__producer'>- {producer}</div>

			{isItemOpen && year && year.length > 0 && (
				<>
					<div className='filter-item__name'>Year</div>
					<div className='filter-item__container'>
						{year.map((item, index) => (
							<div className='filter-item__property' key={index}>
								<input type="checkbox" className='filter--item__checkbox'/>
								<span>{item}</span>
							</div>
						))}
					</div>
				</>

			)}

			{isItemOpen && litres && litres.length > 0 && (
				<>
					<div className='filter-item__name'>Litres</div>
					<div className='filter-item__container'>

						{litres.map((item, index) => (
							<div className='filter-item__property' key={index}>
								<input type="checkbox" className='filter--item__checkbox'/>
								<span>{item}</span>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default FilterItem;