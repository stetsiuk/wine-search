import { createSlice } from '@reduxjs/toolkit';

export interface SearchState {

}

const initialState = {
	country: 'de',
}

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {

	}
})

export default searchSlice.reducer