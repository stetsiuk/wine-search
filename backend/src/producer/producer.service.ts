import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { Producer } from './producer.entity';


@Injectable()
export class ProducerService {
	constructor(
		@InjectRepository(Producer) private producerRepository: Repository<Producer>
	) {}

	public async getLikeProducersByName(producerName: string, limit: number) {
		try {
			const result = await this.producerRepository.createQueryBuilder('producer')
				.select('producer.*')
				.addSelect('LENGTH(producer.name)', 'lt')
				.where('producer.name ILIKE :name', {name: `%${producerName}%`})
				.orderBy('lt', 'ASC')
				.limit(limit)
				.getRawMany()

			return result.map(item => item.name)

		} catch (e) {
			throw new InternalServerErrorException(e.message)
		}
	}

	public async getProducer(producerName: string): Promise<Producer> {
		try {

			return await this.producerRepository.findOne({where: {name: producerName}});

		} catch (e) {

		}
	}

	public async createProducer (producerName: string): Promise<Producer> {
		try {
			const producer = await this.getProducer(producerName);

			if (!producer) {
				const createdProducer = await this.producerRepository.create({name: producerName});
				return await this.producerRepository.save(createdProducer);
			}

			return producer;

		} catch (e) {

		}
	}

	public async createAndGetProducerFromApi (producerFromApi: string) {
		try {
			if (producerFromApi === '') {
				return null;
			}

			return await this.createProducer(producerFromApi);

		} catch (e) {

		}
	}
}