import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from '@nestjs/typeorm';

import { WineController } from "./wine.controller";
import { WineService } from './wine.service';
import { Wine } from './wine.entity';

import { ProducerModule } from '../producer/producer.module';
import { CategoryModule } from '../category/category.module';
import { RequestModule } from '../request/request.module';
import { SortModule } from '../sort/sort.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([Wine]),
      HttpModule,
      RequestModule,
      CategoryModule,
      SortModule,
      ProducerModule
  ],
  controllers: [WineController],
  providers: [WineService]
})
export class WineModule {}
