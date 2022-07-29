import React, { FC, useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { SearchCountries } from './search-countries';
import { changeCountry } from '../../store/search/search.slice';
import { fetchWines } from '../../store/wine/wine.thunks';
import RowInputs from './row-inputs/row-inputs';
import Button from '../button/button';
import './search-input.scss';

const SearchInputs: FC = () => {
	const dispatch = useAppDispatch();
	const country = useAppSelector(state => state.search.country);

	const [vintage, setVintage] = useState(false);

	useEffect(() => {
		const vintageSettingsFromLocalStorage = localStorage.getItem('vintage')

		if (vintageSettingsFromLocalStorage && typeof JSON.parse(vintageSettingsFromLocalStorage) !== 'boolean') {
			localStorage.removeItem('vintage')
		}

		if (vintageSettingsFromLocalStorage) {
			setVintage(JSON.parse(vintageSettingsFromLocalStorage))
		}
	}, [])

	const handleChangeVintage = () => {
		const newVintageSettings = !vintage;
		setVintage(newVintageSettings);
		localStorage.setItem('vintage', JSON.stringify(newVintageSettings));
	}

	return (
		<div className='search'>
			<div className='search__controls'>
				<select className='search__country' value={country} onChange={(e) => dispatch(changeCountry(e.target.value))}>
					{SearchCountries.map((item, index) =>
						<option key={index} value={item.value}>{item.name}</option>
					)}
				</select>
				<div className='search__vintage'>
					<span>Search vintage wines</span>
					<input
						type="checkbox"
						checked={vintage}
						onChange={handleChangeVintage}
					/>
				</div>
				<Button type='medium' text='Search' onClick={() => dispatch(fetchWines())}/>
			</div>
			<RowInputs vintage={vintage}/>
		</div>
	);
};

export default SearchInputs;