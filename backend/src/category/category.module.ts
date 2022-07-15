import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Module({
	providers: [CategoryService],
	exports: [CategoryService],
	imports: [
		TypeOrmModule.forFeature([Category])
	]
})
export class CategoryModule {}