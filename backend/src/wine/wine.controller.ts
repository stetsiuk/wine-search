import { Controller, Get, Query, Post } from "@nestjs/common";

import { WineService } from "./wine.service";
import { WineQueryDto } from "./dto/wine-query.dto";

@Controller('wine')
export class WineController {
  constructor(private wineService: WineService) {}

  @Post()
  createWine() {
    return this.wineService.createWine();
  }

  @Get()
  collectWines(@Query() dto: WineQueryDto) {
    return this.wineService.collectWines(dto);
  }
}
