import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

import { WineQueryDto } from "./dto/wine-query.dto";
import { IAggregateWines, IFetchedWines, IWine, IWineApiResponse } from './wine.interface';


@Injectable()
export class WineService {
  constructor(private readonly httpService: HttpService) {}

  public async getWines(dto: WineQueryDto) {
    try {
      const {queryItems, country, orderBy, numberOfItems} = dto;

      let fetchedWines: {[key: string]: IWine[]} = {};

      for (let i = 0; i < queryItems.length; i++) {
        const query = encodeURIComponent(queryItems[i]);

        const {data} = await this.httpService.axiosRef.get<IWineApiResponse>(`https://api.wein.cc/v1.0/search/serp/${query}/${country}/${orderBy}/${numberOfItems}`, {
          auth: {
            username: String(process.env.API_WEIN_USERNAME),
            password: String(process.env.API_WEIN_PASSWORD)
          }
        })

        if (data.status === 'ok') {
          fetchedWines[queryItems[i]] = [...Object.values(data.result)];
        } else {
          return {status: 'error'};
        }

        await this.delayUntilNextRequest(1000);
      }

      return this.aggregateWines(fetchedWines);

    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_GATEWAY);
    }
  };

  private async aggregateWines(fetchedWines: IFetchedWines) {
    const listMerchantId = this.getListMerchantId(fetchedWines);

    let aggregatedWines: IAggregateWines = {
      status: '',
      queryCounts: {},
      shopCounts: 0,
      shopResults: {}
    };

    Object.entries(fetchedWines).forEach(([key, value]) => {

      aggregatedWines.queryCounts[key] = 0;

      Object.values(value).forEach(item => {

        if (!aggregatedWines.shopResults.hasOwnProperty(item.merchanturl)) {
          aggregatedWines.shopResults[item.merchanturl] = {
            foundedItems: 0,
            items: []
          }
        }

        if (this.checkItemAvailableToAllMerchants(item.merchantid, listMerchantId)) {
          aggregatedWines.queryCounts[key] += 1;

          aggregatedWines.shopResults[item.merchanturl] = {
            foundedItems: aggregatedWines.shopResults[item.merchanturl].foundedItems + 1,
            items: [...aggregatedWines.shopResults[item.merchanturl].items, item]
          }

        }
      })
    });

    Object.entries(aggregatedWines.shopResults).forEach(([key, value]) => {
      if (value.foundedItems === 0 ) {
        delete aggregatedWines.shopResults[key]
      }
    })

    const shopCounts = Object.entries(aggregatedWines.shopResults).length;

    aggregatedWines.shopCounts = shopCounts;

    if (shopCounts === 0) {
      aggregatedWines.status = 'empty';
    } else {
      aggregatedWines.status = 'ok';
    }

    return {...aggregatedWines};
  };

  private getListMerchantId(fetchedWines: IFetchedWines) {
    let listMerchantId: {[key: string]: [string]} | {} = {};

    for (let [key, value] of Object.entries(fetchedWines)) {
      let merchantIds = [];

      for (let item of value) {
        merchantIds.push(item.merchantid);
      }

      listMerchantId[key] = merchantIds;
    }

    return listMerchantId;
  };

  private checkItemAvailableToAllMerchants(id: string, listMerchantId: {[key: string]: [string]}) {
    let flag = true;

    for (let value of Object.values(listMerchantId)) {
      if (!value.includes(id)) {
        flag = false;
        break;
      }
    }

    return flag;
  };

  private delayUntilNextRequest(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
}