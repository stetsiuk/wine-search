import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Producer } from './producer.entity';



@Injectable()
export class ProducerService {
	constructor(
		@InjectRepository(Producer) private producerService: Repository<Producer>
	) {}

	public async getProducer(producerName: string): Promise<Producer> {
		try {

			return await this.producerService.findOne({where: {name: producerName}});

		} catch (e) {

		}
	}

	public async createProducer (producerName: string): Promise<Producer> {
		try {
			const producer = await this.getProducer(producerName);

			if (!producer) {
				const createdProducer = await this.producerService.create({name: producerName});
				return await this.producerService.save(createdProducer);
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