import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Partner } from './partner.entity';

@Injectable()
export class PartnerService {
	constructor(
		@InjectRepository(Partner) private partnerRepository: Repository<Partner>
	) {}

	async getPartnerById(id: number) {
		return await this.partnerRepository.findOne({where: {id: id}});
	}
}