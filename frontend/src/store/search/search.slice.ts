import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IPayloadChangeSearchItem, ISearchState } from './search.interface';


const initialState: ISearchState = {
	country: 'de',
	searchWines: [
		{name: '', producer: '', vintage: null, visibleAddButton: true}
	]
}

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		changeCountry (state, action: PayloadAction<string>) {
			state.country = action.payload;
		},

		addSearchWine (state, action: PayloadAction<number>) {
				const searchWines = state.searchWines;
				if (searchWines[searchWines.length - 1].name || searchWines[searchWines.length - 1].producer) {
					searchWines[action.payload].visibleAddButton = false;
					searchWines.push({name: '', producer: '', vintage: null, visibleAddButton: true})
				}
			},

		deleteSearchWine (state, action: PayloadAction<number>) {
			const index = action.payload
			state.searchWines.splice(index, 1)
		},

		changeItemSearchWine (state, action: PayloadAction<IPayloadChangeSearchItem>) {
			const {index, field, value} = action.payload;

			// @ts-ignore
			state.searchWines[index][field] = value;
		},
	}
})

export const { changeCountry, addSearchWine, deleteSearchWine, changeItemSearchWine } = searchSlice.actions;
export default searchSlice.reducer;