import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from './partner.entity';
import { PartnerService } from './partner.service';

@Module({
	providers: [PartnerService],
	exports: [PartnerService],
	imports: [
		TypeOrmModule.forFeature([Partner])
	]
})
export class PartnerModule {}