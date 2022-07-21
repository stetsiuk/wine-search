import React, { FC, PropsWithChildren, useState } from 'react';

import './row-inputs.scss';
import InputProducerAutocomplete from '../../input/input-producer/inputProducerAutocomplete';

interface IRowInputsProps {
	vintage: boolean
}

interface SearchWines {
	name?: string
	producer?: string
	vintage?: number | null
	visibleAddButton: boolean
}


const RowInputs: FC<PropsWithChildren<IRowInputsProps>> = ({vintage}) => {

	const [searchWines, setSearchWines] = useState<SearchWines[]>([{name: '', producer: '', vintage: null, visibleAddButton: true}])

	const handleChangeInputValue = (index: number, field: 'name' | 'producer' | 'vintage', value: string) => {
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

	const handleAddSearchInput = (index: number) => {
		if (searchWines[searchWines.length - 1].name || searchWines[searchWines.length - 1].producer) {
			setSearchWines(prevState => {
				let newState = [...prevState];
				newState[index].visibleAddButton = false
				newState.push({name: '', producer: '', vintage: null, visibleAddButton: true})
				return newState
			})
		}
	}

	const handleDeleteSearchInput = (index: number) => {
		setSearchWines(prevState => prevState.filter((i, idx) => index !== idx))
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
					{/*<input*/}
					{/*	type='text'*/}
					{/*	placeholder='Producer'*/}
					{/*	value={searchWines[index].producer}*/}
					{/*	onChange={(e) => handleChangeInputValue(index, 'producer', e.target.value)}*/}
					{/*/>*/}

					<InputProducerAutocomplete
						value={searchWines[index].producer}
						onChange={(e) => handleChangeInputValue(index, 'producer', e.target.value)}
					/>

					{vintage && (
						<input
							className='vintage'
							type="text"
							placeholder='Year'
							value={searchWines[index].vintage === null ? '' : Number(searchWines[index].vintage)}
							onChange={(e) => handleChangeInputValue(index, 'vintage', e.target.value)}
						/>
					)}

					<div className='row-control'>
						{item.visibleAddButton
							? <button className='row-btn' onClick={() => handleAddSearchInput(index)}><span>+</span></button>
							: <div>
								<button className='row-btn' onClick={() => handleDeleteSearchInput(index)}><span>-</span></button>
							</div>
						}
					</div>
				</div>
			))}
		</div>
	);
};

export default RowInputs;