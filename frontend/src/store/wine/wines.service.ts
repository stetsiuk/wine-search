import { API } from '../../utils/axios';

export const WinesService = {
	async getWines(query: string) {
		try {
			const {data} = await API.get(`/wines${query}`);
			return data
		} catch (e) {
			console.log(e)
		}
	}

}