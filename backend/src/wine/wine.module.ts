import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from '@nestjs/typeorm';

import { WineService } from './wine.service';
import { WineController } from "./wine.controller";
import { Wine } from './wine.entity';
import { RequestModule } from '../request/request.module';
import { CategoryModule } from '../category/category.module';
import { SortModule } from '../sort/sort.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([Wine]),
      HttpModule,
      RequestModule,
      CategoryModule,
      SortModule
  ],
  controllers: [WineController],
  providers: [WineService]
})
export class WineModule {}
