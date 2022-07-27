import React, { FC, useEffect, useState } from 'react';

import RowInputs from './row-inputs/row-inputs';
import Button from '../button/button';

import './search-input.scss';

const SearchInputs: FC = () => {

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
		setVintage(newVintageSettings)
		localStorage.setItem('vintage', JSON.stringify(newVintageSettings))
	}

	return (
		<div className='search'>
			<div className='search__controls'>
				<select className='search__country'>
					<option value="de">Germany</option>
					<option value="at">Austria</option>
					<option value="ch">Switzerland</option>
					<option value="us">USA</option>
					<option value="gb">Great Britain</option>
				</select>
				<div className='search__vintage'>
					<span>Search vintage wines</span>
					<input
						type="checkbox"
						checked={vintage}
						onChange={handleChangeVintage}
					/>
				</div>
				<Button type='medium' text='Search'/>
			</div>
			<RowInputs vintage={vintage}/>
		</div>
	);
};

export default SearchInputs;