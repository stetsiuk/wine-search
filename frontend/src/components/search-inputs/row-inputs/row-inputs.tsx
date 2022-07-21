import React, { FC, PropsWithChildren, useState } from 'react';

import './row-inputs.scss';

interface SearchWines {
	name?: string
	producer?: string
}


const RowInputs: FC<PropsWithChildren> = () => {

	const [searchWines, setSearchWines] = useState<SearchWines[]>([{name: '', producer: ''}])

	const handleAddSearchInput = () => {
		setSearchWines([...searchWines, {name: '', producer: ''}])
	}

	const handleChangeInputValue = (index: number, field: 'name' | 'producer', value: string) => {
		setSearchWines(prevState => prevState.map((item, inx) => {
			if (index === inx) {
				return {
					...item,
					[field]: value
				}
			}
			return item
		}))
	}

	return (
		<div className='row-container'>
			{searchWines?.map((item, index) => (
				<div className='row-item' key={index}>
					<input
						type='text'
						placeholder='Name'
						value={searchWines[index].name}
						onChange={(e) => handleChangeInputValue(index, 'name', e.target.value)}
					/>
					<input
						type='text'
						placeholder='Producer'
						value={searchWines[index].producer}
						onChange={(e) => handleChangeInputValue(index, 'producer', e.target.value)}
					/>
					<button className='row-btn' onClick={handleAddSearchInput}><span>+</span></button>
				</div>
			))}
		</div>
	);
};

export default RowInputs;