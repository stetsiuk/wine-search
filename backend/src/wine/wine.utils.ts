import { ILike } from 'typeorm';

import { Query } from './dto/wine-query.dto';
import { WineCountries } from './wine.interface';
import { BadRequestException } from '@nestjs/common';

export const createDynamicTypeOrmWhereQueries = (query: Query, country: WineCountries) => {
	const param: any = {}

	if (query.name && query.name !== '') {
		param.name = ILike(`%${query.name}%`);
	}
	if (query.producer && query.producer !== '') {
		param.producer = {
			name: ILike(`%${query.producer}%`)
		}
	}

	if (query.year && query.year !== '') {
		if (!isNaN(Number(query.year))) {
			param.vintage = Number(query.year)
		} else {
			throw new BadRequestException('The wine vintage field was entered incorrectly')
		}
	}

	if (country) {
		param.country = country
	}

	return param;
}