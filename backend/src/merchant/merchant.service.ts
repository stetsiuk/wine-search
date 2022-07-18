import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Merchant } from './merchant.entity';

@Injectable()
export class MerchantService {
	constructor(
		@InjectRepository(Merchant) private merchantRepository: Repository<Merchant>
	) {}

	async getMerchant (merchantName: string) {
		try {
			return await this.merchantRepository.findOne({where: {name: merchantName}});

		} catch (e) {

		}
	}

	async createAndGetMerchant (merchantName: string) {
		try {
			if (merchantName === '') {
				return new BadRequestException('Merchant is not valid')
			}

			const merchant = await this.getMerchant(merchantName);

			if (!merchant) {
				const newMerchant = await this.merchantRepository.create({name: merchantName});

				return await this.merchantRepository.save(newMerchant);
			}

			return merchant

		} catch (e) {

		}

	}
}