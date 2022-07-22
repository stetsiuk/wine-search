import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';
import { Producer } from './producer.entity';

@Module({
	controllers: [ProducerController],
	providers: [ProducerService],
	exports: [ProducerService],
	imports: [
		TypeOrmModule.forFeature([Producer])
	]
})
export class ProducerModule {}