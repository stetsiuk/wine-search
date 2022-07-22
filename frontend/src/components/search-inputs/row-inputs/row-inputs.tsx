import React, { FC, PropsWithChildren, useState } from 'react';

import InputProducerAutocomplete from '../../input/input-producer/inputProducerAutocomplete';
import './row-inputs.scss';


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

	const handleChangeInputValue = (index: number, field: 'name' | 'producer' | 'vintage', value: string | null) => {
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

	const handleChangeVintageInput = (index: number, value: string) => {
		if (value === '') {
			handleChangeInputValue(index, 'vintage', null)
		}
		if (Number(value) && value.length <= 4) {
			handleChangeInputValue(index, 'vintage', value)
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

					<InputProducerAutocomplete
						value={searchWines[index].producer}
						index={index}
						handleChangeInputValue={handleChangeInputValue}
					/>

					{vintage && (
						<input
							className='vintage'
							type="text"
							placeholder='Year'
							pattern='^\d{4}$'
							value={searchWines[index].vintage === null ? '' : Number(searchWines[index].vintage)}
							onChange={(e) => handleChangeVintageInput(index, e.target.value)}
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