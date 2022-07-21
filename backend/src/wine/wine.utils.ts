import { ILike } from 'typeorm';

import { Query } from './dto/wine-query.dto';

export const createDynamicTypeOrmWhereQueries = (query: Query) => {
	const param: any = {}

	if (query.name && query.name !== '') {
		param.name = ILike(`%${query.name}%`);
	}
	if (query.producer && query.producer !== '') {
		param.producer = ILike(`%${query.producer}%`)
	}
	if (query.year && query.year !== '' && Number.isInteger(query.year)) {
		param.vintage = Number(query.year)
	}

	return param;
}