import { Controller, Get, Query } from "@nestjs/common";

import { WineService } from "./wine.service";
import { WineQueryDto } from "./dto/wine-query.dto";

@Controller('wine')
export class WineController {
  constructor(private wineService: WineService) {}

  @Get()
  getWines(@Query() dto: WineQueryDto) {
    return this.wineService.getWines(dto);
  }

}
