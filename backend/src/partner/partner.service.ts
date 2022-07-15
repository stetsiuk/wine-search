import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from './partner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PartnerService {
	constructor(
		@InjectRepository(Partner) private partnerRepository: Repository<Partner>
	) {}

	async getPartner(id: number) {
		const partner = await this.partnerRepository.findOne({where: {id: id}});

	}
}