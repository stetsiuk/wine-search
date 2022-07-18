import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Search } from './search.entity';
import { SearchService } from './search.service';

@Module({
	providers: [SearchService],
	exports: [SearchService],
	imports: [
		TypeOrmModule.forFeature([Search])
	]
})
export class SearchModule {}