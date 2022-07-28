import { createAsyncThunk } from '@reduxjs/toolkit';

import { WinesService } from './wines.service';
import { ISearchWines } from '../search/search.interface';


export const fetchWines = createAsyncThunk(
	'fetch/wines',
	async (searchParams: ISearchWines[], {getState}) => {
		try {
			const query = new URLSearchParams(searchParams);

			const wines = WinesService.getWines(decodeURIComponent(query.toString()))
		} catch (e) {

		}
	}
)