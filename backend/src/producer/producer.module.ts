import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProducerService } from './producer.service';
import { Producer } from './producer.entity';

@Module({
	providers: [ProducerService],
	exports: [ProducerService],
	imports: [
		TypeOrmModule.forFeature([Producer])
	]
})
export class ProducerModule {}