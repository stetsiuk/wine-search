import { createAsyncThunk } from '@reduxjs/toolkit';

import { WinesService } from './wines.service';
import { RootState } from '../hooks';


export const fetchWines = createAsyncThunk<any, undefined, {state: RootState}>(
	'wine/fetchWines',
	async (_, {getState}) => {
		try {
			const { searchWines } = getState().search;
			const wines = WinesService.getWines(searchWines)
		} catch (e) {

		}
	}
)