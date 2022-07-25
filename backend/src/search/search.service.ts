import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { WineCountries } from '../wine/wine.interface';
import { Search } from './search.entity';

@Injectable()
export class SearchService {
	constructor(
		@InjectRepository(Search) private searchRepository: Repository<Search>
	) {}

	public async create(searchName: string, country: WineCountries) {
		try {
			const request = this.searchRepository.create({name: searchName, country: country});
			return await this.searchRepository.save(request);
		} catch (e) {
			throw new InternalServerErrorException()
		}
	}

	public async checkWasSearchRequestMadeForPeriod (searchName: string, country: WineCountries, hours: number) {

		const currentDate = new Date();

		currentDate.setHours(currentDate.getHours() - hours);

		const checkedSearchRequest: Search = await this.searchRepository.findOne({
			where: {
				name: searchName,
				country: country,
				createdAt: MoreThan(currentDate.toLocaleString())
			}
		})

		return Boolean(checkedSearchRequest);
	}

}