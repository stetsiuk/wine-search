import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MerchantService } from './merchant.service';
import { Merchant } from './merchant.entity';

@Module({
	providers: [MerchantService],
	exports: [MerchantService],
	imports: [
		TypeOrmModule.forFeature([Merchant])
	]
})
export class MerchantModule {}