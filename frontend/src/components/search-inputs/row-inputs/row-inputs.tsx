import React, { FC, PropsWithChildren } from 'react';

import InputProducerAutocomplete from '../../input/input-producer/inputProducerAutocomplete';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { deleteSearchWine, addSearchWine, changeItemSearchWine } from '../../../store/search/search.slice';
import './row-inputs.scss';


interface IRowInputsProps {
	vintage: boolean
}

const RowInputs: FC<PropsWithChildren<IRowInputsProps>> = ({ vintage }) => {

	const dispatch = useAppDispatch();
	const {searchWines} = useAppSelector(state => state.search);

	const handleChangeVintageInput = (index: number, value: string) => {
		if (value === '') {
			dispatch(changeItemSearchWine({index, field: 'vintage', value: null}))
		}
		if (Number(value) && value.length <= 4) {
			dispatch(changeItemSearchWine({index, field: 'vintage', value}))
		}
	}


	return (
		<div className='row-container'>
			{searchWines?.map((item, index) => (
				<div className='row-item' key={index}>
					<input
						type='text'
						placeholder='Name'
						value={searchWines[index].name}
						onChange={(e) => dispatch(changeItemSearchWine({index, field: 'name', value: e.target.value}))}
					/>

					<InputProducerAutocomplete
						value={searchWines[index].producer}
						index={index}
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
							? <button className='row-btn' onClick={() => dispatch(addSearchWine(index))}><span>+</span></button>
							: <div>
								<button className='row-btn' onClick={() => dispatch(deleteSearchWine(index))}><span>-</span></button>
							</div>
						}
					</div>
				</div>
			))}
		</div>
	);
};

export default RowInputs;