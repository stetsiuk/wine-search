import { Controller, Get, Query } from "@nestjs/common";

import { WineService } from "./wine.service";
import { WineQueryDto } from "./dto/wine-query.dto";

@Controller('wines')
export class WineController {
  constructor(private wineService: WineService) {}

  @Get()
  getWine(@Query() dto: WineQueryDto) {
    return this.wineService.getWines(dto);
  }
}
