import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WineModule } from './wein/wine.module';
import { ProducerModule } from './producer/producer.module';
import { getTypeOrmConfig } from './config/database/typeorm.config';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
          envFilePath: `.env`
        }),
        TypeOrmModule.forRootAsync({
          useFactory: getTypeOrmConfig
        }),
        WineModule,
        ProducerModule,
    ],
})
export class AppModule {}