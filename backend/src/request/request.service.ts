import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { Request } from './request.entity';

@Injectable()
export class RequestService {
	constructor(
		@InjectRepository(Request) private requestRepository: Repository<Request>
	) {}

	public async create(requestName: string) {
		const request = await this.requestRepository.create({name: requestName});
		return await this.requestRepository.save(request);
	}

	public async checkWasRequestMadeForPeriod (requestName: string, hours: number) {

		const currentDate = new Date();

		currentDate.setHours(currentDate.getHours() - hours);

		const checkedRequest: Request = await this.requestRepository.findOne(
			{
				where: {
					name: requestName,
					createdAt: MoreThan(currentDate.toLocaleString())
				}
			}
		)

		return Boolean(checkedRequest);
	}

	public async testTZ() {

	}

}