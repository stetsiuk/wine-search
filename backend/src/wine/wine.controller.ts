import { Controller, Get, Query, Post, HttpCode } from "@nestjs/common";

import { WineService } from "./wine.service";
import { WineQueryDto } from "./dto/wine-query.dto";

@Controller('wine')
export class WineController {
  constructor(private wineService: WineService) {}

  @Get()
  @HttpCode(200)
  collectWines(@Query() dto: WineQueryDto) {
    return this.wineService.collectWines(dto);
  }

  @Post('init-vinocentral')
  initVinocentral() {
    return this.wineService.initVinocentral();
  }
}
