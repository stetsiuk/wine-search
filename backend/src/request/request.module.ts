import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Request } from './request.entity';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';

@Module({
	providers: [RequestService],
	exports: [RequestService],
	controllers: [RequestController],
	imports: [
		TypeOrmModule.forFeature([Request])
	],

})
export class RequestModule {}