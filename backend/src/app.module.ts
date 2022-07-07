import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { WineModule } from './wein/wine.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
          envFilePath: `.env`
        }),
        WineModule
    ],
})
export class AppModule {}