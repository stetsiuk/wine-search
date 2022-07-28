import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchState } from './search.interface';



const initialState: ISearchState = {
	country: 'de',
	searchWines: [{name: '', producer: '', vintage: null, visibleAddButton: true}]
}

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		changeCountry (state, action: PayloadAction<string>) {
			state.country = action.payload;
		}
	}
})

export const { changeCountry } = searchSlice.actions;
export default searchSlice.reducer;