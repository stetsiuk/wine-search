import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { Search } from './search.entity';

@Injectable()
export class SearchService {
	constructor(
		@InjectRepository(Search) private searchRepository: Repository<Search>
	) {}

	public async create(searchName: string) {
		const request = await this.searchRepository.create({name: searchName});
		return await this.searchRepository.save(request);
	}

	public async checkWasSearchRequestMadeForPeriod (searchName: string, hours: number) {

		const currentDate = new Date();

		currentDate.setHours(currentDate.getHours() - hours);

		const checkedSearchRequest: Search = await this.searchRepository.findOne(
			{
				where: {
					name: searchName,
					createdAt: MoreThan(currentDate.toLocaleString())
				}
			}
		)

		return Boolean(checkedSearchRequest);
	}

}