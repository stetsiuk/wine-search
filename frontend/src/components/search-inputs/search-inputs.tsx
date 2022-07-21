import React, { FC, useState } from 'react';

import RowInputs from './row-inputs/row-inputs';
import './search-input.scss';
import Button from '../button/button';

const SearchInputs: FC = () => {
	const [vintage, setVintage] = useState(false);

	const handleSearchWine = () => {

	}

	return (
		<div className='search'>
			<div className='search__controls'>
				<div className='search__vintage'>
					<span>Search vintage wines</span>
					<input type="checkbox" checked={vintage} onChange={() => setVintage(prevState => !prevState)}/>
				</div>
				<Button type='medium' text='Search' onClick={() => handleSearchWine()}/>
			</div>
			<RowInputs vintage={vintage}/>
		</div>
	);
};

export default SearchInputs;