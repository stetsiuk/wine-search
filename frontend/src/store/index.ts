import { configureStore } from '@reduxjs/toolkit';

import searchReducer from './search/search.slice';
import wineReducer from './wine/wine.slice';


export const store = configureStore({
	reducer: {
		search: searchReducer,
		wine: wineReducer
	}
})