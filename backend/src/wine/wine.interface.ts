import { Wine } from './wine.entity';

export interface IWineMatch {
	name: string;
	isAffiliated: boolean;
	amountWines: number;
	wines: {
		[key: string]: Wine[] | []
	}
}

export interface IWineData {
	multipleMatch: IWineMatch[];
	singleMatch: IWineMatch[];
}

export interface IWine {
	pos: number;
	id: string;
	merchantid: string;
	artikelnummer: string;
	preis: number;
	jahrgang: string;
	merchanturl: string;
	kategorie: string | [string];
	rebsorte: string | [string];
	quantity: string;
	liter: number;
	alk: number;
	produktname: string;
	produzent: string;
	land: string;
	region: string;
	ort: string;
	ean: string;
}

export interface IWineApiResponse {
	status: string;
	result: {
		[key: string]: IWine
	};
	duration: number;
	remaining: number;
}

export interface ISelectedWines {
	[key: string]: Wine[]
}

export enum WineCountries {
	De = 'de',
	At = 'at',
	Ch = 'ch',
	Us = 'us',
	Gb = 'gb'
}