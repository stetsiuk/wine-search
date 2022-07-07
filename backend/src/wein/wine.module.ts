import { Module } from '@nestjs/common';
import { WineService } from './wine.service';
import { WineController } from "./wine.controller";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [WineController],
  providers: [WineService]
})
export class WineModule {}
