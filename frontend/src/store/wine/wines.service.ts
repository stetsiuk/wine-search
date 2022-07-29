import { API } from '../../utils/axios';
import { ISearchWines } from '../search/search.interface';

export const WinesService = {
	async getWines(searchWines: ISearchWines[]) {
		try {
			const params = new URLSearchParams();

			searchWines.forEach((item, index) => {
				if (item.name) {
					params.append(`[queries][${index}][name]`, item.name)
				}
				if (item.producer) {
					params.append(`[queries][${index}][producer]`, item.producer)
				}
				if (item.vintage) {
					params.append(`[queries][${index}][name]`, String(item.vintage))
				}
			})

			console.log(params.toString())

			// const result = '';
			//
			// searchWines.forEach(item => {
			// 	const {visibleAddButton, ...newItem} = item;
			// 	if (newItem.name || newItem.producer)
			//
			// 	result.concat(qs.stringify(item));
			// })
			// // const result = qs.stringify(searchWines);
			// console.log(result)
			// // console.log(new URLSearchParams(searchWines[0]))


			// const {data} = await API.get(`/wines${query}`);
			// return data
		} catch (e) {
			console.log(e)
		}
	}

}