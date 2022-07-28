export interface ISearchState {
	country: string;
	searchWines: ISearchWines[]
}

export interface ISearchWines {
	name?: string
	producer?: string
	vintage?: number | null
	visibleAddButton: boolean
}