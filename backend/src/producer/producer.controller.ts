import { Controller, Get, Param } from '@nestjs/common';

import { ProducerService } from './producer.service';

@Controller('producer')
export class ProducerController {
	constructor(
		private readonly producerService: ProducerService
	) {}

	@Get(':name')
	async getLikeProducersByName(@Param('name') name: string) {
		return this.producerService.getLikeProducersByName(name, 10)
	}


}