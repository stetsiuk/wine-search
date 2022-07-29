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

export interface IPayloadChangeSearchItem {
	index: number
	field: 'name' | 'producer' | 'vintage'
	value: string | null
}