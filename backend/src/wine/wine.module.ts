import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from '@nestjs/typeorm';

import { WineController } from "./wine.controller";
import { WineService } from './wine.service';
import { Wine } from './wine.entity';

import { ProducerModule } from '../producer/producer.module';
import { CategoryModule } from '../category/category.module';
import { SearchModule } from '../search/search.module';
import { SortModule } from '../sort/sort.module';
import { MerchantModule } from '../merchant/merchant.module';
import { PartnerModule } from '../partner/partner.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([Wine]),
      HttpModule,
      SearchModule,
      CategoryModule,
      SortModule,
      ProducerModule,
      PartnerModule,
      MerchantModule
  ],
  controllers: [WineController],
  providers: [WineService]
})
export class WineModule {}
