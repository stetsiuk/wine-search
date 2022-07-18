import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getTypeOrmConfig } from './config/database/typeorm.config';
import { WineModule } from './wine/wine.module';
import { ProducerModule } from './producer/producer.module';
import { PartnerModule } from './partner/partner.module';
import { VisitModule } from './visit/visit.module';
import { SearchModule } from './search/search.module';
import { CategoryModule } from './category/category.module';
import { SortModule } from './sort/sort.module';
import { MerchantModule } from './merchant/merchant.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
          envFilePath: `.env`,
        }),
        TypeOrmModule.forRootAsync({
          useFactory: getTypeOrmConfig
        }),
        WineModule,
        ProducerModule,
        PartnerModule,
        VisitModule,
        SearchModule,
        SortModule,
        CategoryModule,
        MerchantModule
    ]
})
export class AppModule {}