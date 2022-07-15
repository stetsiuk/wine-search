import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sort } from './sort.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SortService {
	constructor(
		@InjectRepository(Sort) private sortRepository: Repository<Sort>
	) {}

	public async getSort (sortName: string): Promise<Sort> {
		try {
			return await this.sortRepository.findOne({where: {name: sortName}});
		} catch (e) {

		}
	}

	public async createSort (sortName: string): Promise<Sort> {
		try {
			const sort = await this.getSort(sortName);

			if (!sort) {
				const createdSort = await this.sortRepository.create({name: sortName});

				return await this.sortRepository.save(createdSort);
			}

			return sort;

		} catch (e) {

		}
	}


	public async createAndGetSortsFromApi (sortsFromApi: string | string[]) {
		try {
			if (sortsFromApi === '') {
				return null;
			}

			if (Array.isArray(sortsFromApi)) {
				const createdSorts: Sort[] = [];

				for (let sort of sortsFromApi) {
					const newSort = await this.createSort(sort)
					createdSorts.push(newSort);
				}
				return createdSorts;
			}

			return [await this.createSort(sortsFromApi)];

		} catch (e) {

		}
	}


}