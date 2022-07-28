
export interface IWinesResponse {
	[key: string]: IMerchant[]
}

interface IMerchant {
	name: string
	amountWines: number
	wines: {
		[key: string]: IWine[]
	}
}

interface IWine {
	name: string
	vintage: number
	price: number
	volume: number
	quantity: number
	link: string
	imageUrl: string
}