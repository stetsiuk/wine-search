import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from './partner.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Partner])]
})
export class PartnerModule {}