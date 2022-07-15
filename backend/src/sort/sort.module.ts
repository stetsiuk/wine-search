import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SortService } from './sort.service';
import { Sort } from './sort.entity';

@Module({
	providers: [SortService],
	exports: [SortService],
	imports: [
		TypeOrmModule.forFeature([Sort])
	]
})
export class SortModule {}