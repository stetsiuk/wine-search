import { Controller, Get, Query, Post, HttpCode, ValidationPipe, UsePipes } from '@nestjs/common';

import { WineService } from "./wine.service";
import { WineQueryDto } from "./dto/wine-query.dto";

@Controller('wine')
export class WineController {
  constructor(private wineService: WineService) {}

  @Get()
  @HttpCode(200)
  // @UsePipes(new ValidationPipe())
  collectWines(@Query() dto: WineQueryDto) {
    return this.wineService.collectWines(dto);
  }

  @Get('check')
  check() {
    return this.wineService.deleteExpiredWines();
  }

  @Post('init-vinocentral')
  initVinocentral() {
    return this.wineService.initVinocentralDB();
  }
}