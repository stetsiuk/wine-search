import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RequestService } from '../request/request.service';
import { CategoryService } from '../category/category.service';
import { SortService } from '../sort/sort.service';
import { Wine } from './wine.entity';
import { WineQueryDto } from './dto/wine-query.dto';
import { IAggregateWines, IFetchedWines, IWine, IWineApiResponse } from './wine.interface';
import { WEIN_CC_API_URL, WEIN_CC_PARTNER_ID, WEIN_CC_WINE_IMG_URL } from './wine.constants';


@Injectable()
export class WineService {
  constructor(
      @InjectRepository(Wine) private wineRepository: Repository<Wine>,
      private readonly httpService: HttpService,
      private readonly requestService: RequestService,
      private readonly categoryService: CategoryService,
      private readonly sortService: SortService
  ) {}


  public async getWines (dto: WineQueryDto) {
    try {
      const request = await this.requestService.create(dto.uniqueQuery);

      const isRequestInDB = await this.requestService.checkHasRequestMadeForPeriod(dto.uniqueQuery, 2)

      if (isRequestInDB) {


      }

      const {isFetched} = await this.fetchWinesFromApi(dto);



    } catch (e) {

    }
  }

  private async fetchWinesFromApi (dto: WineQueryDto) {
    try {
      const {uniqueQuery, country, orderBy, numberOfItems} = dto;

      const {data} = await this.httpService.axiosRef.get<IWineApiResponse>(`${WEIN_CC_API_URL}/${uniqueQuery}/${country}/${orderBy}/${numberOfItems}`, {
        auth: {
          username: String(process.env.API_WEIN_USERNAME),
          password: String(process.env.API_WEIN_PASSWORD)
        }
      });

      if (data.status === 'ok') {
        const wines = [...Object.values(data.result)];

        await this.createWinesFromApi(wines);

        return {isFetched: true};
      }

    } catch (e) {

    }
  }

  private async createWinesFromApi(wines: IWine[]) {
    try {
      for (let i = 0; i < wines.length; i++) {
        const wine = wines[i];

        const wineCategories = await this.categoryService.createAndGetCategoriesFromApi(wine.kategorie);
        const wineSorts = await this.sortService.createAndGetSortsFromApi(wine.rebsorte);

        const createdWine = this.wineRepository.create({
          name: wine.produktname,
          producer: wine.produzent,
          vintage: (wine.jahrgang === '' || wine.jahrgang === '0') ? null : Number(wine.jahrgang),
          price: wine.preis,
          alcohol: wine.alk,
          volume: wine.liter,
          quantity: Number(wine.quantity),
          categories: wineCategories,
          sorts: wineSorts,
          affiliateLink: null,
          imageUrl: WEIN_CC_WINE_IMG_URL(wine.id),
          merchantId: wine.merchantid,
          merchantUrl: wine.merchanturl,
          land: wine.land,
          region: wine.region,
          ean: wine.ean,
          partnerId: WEIN_CC_PARTNER_ID,
        })

        await this.wineRepository.save(createdWine)
      }
    } catch (e) {

    }
  }


  // public async getWines(dto: WineQueryDto) {
  //   try {
  //     const {queryItems, country, orderBy, numberOfItems} = dto;
  //
  //     let fetchedWines: {[key: string]: IWine[]} = {};
  //
  //     for (let i = 0; i < queryItems.length; i++) {
  //       const query = encodeURIComponent(queryItems[i]);
  //
  //       const {data} = await this.httpService.axiosRef.get<IWineApiResponse>(`https://api.wein.cc/v1.0/search/serp/${query}/${country}/${orderBy}/${numberOfItems}`, {
  //         auth: {
  //           username: String(process.env.API_WEIN_USERNAME),
  //           password: String(process.env.API_WEIN_PASSWORD)
  //         }
  //       })
  //
  //       if (data.status === 'ok') {
  //         fetchedWines[queryItems[i]] = [...Object.values(data.result)];
  //       } else {
  //         return {status: 'error'};
  //       }
  //
  //       await this.delayUntilNextRequest(1000);
  //     }
  //
  //     return this.aggregateWines(fetchedWines);
  //
  //   } catch (e) {
  //     throw new HttpException(e.message, HttpStatus.BAD_GATEWAY);
  //   }
  // };
  //
  // private async aggregateWines(fetchedWines: IFetchedWines) {
  //   const listMerchantId = this.getListMerchantId(fetchedWines);
  //
  //   let aggregatedWines: IAggregateWines = {
  //     status: '',
  //     queryCounts: {},
  //     shopCounts: 0,
  //     shopResults: {}
  //   };
  //
  //   Object.entries(fetchedWines).forEach(([key, value]) => {
  //
  //     aggregatedWines.queryCounts[key] = 0;
  //
  //     Object.values(value).forEach(item => {
  //
  //       if (!aggregatedWines.shopResults.hasOwnProperty(item.merchanturl)) {
  //         aggregatedWines.shopResults[item.merchanturl] = {
  //           foundedItems: 0,
  //           items: []
  //         }
  //       }
  //
  //       if (this.checkItemAvailableToAllMerchants(item.merchantid, listMerchantId)) {
  //         aggregatedWines.queryCounts[key] += 1;
  //
  //         aggregatedWines.shopResults[item.merchanturl] = {
  //           foundedItems: aggregatedWines.shopResults[item.merchanturl].foundedItems + 1,
  //           items: [...aggregatedWines.shopResults[item.merchanturl].items, item]
  //         }
  //
  //       }
  //     })
  //   });
  //
  //   Object.entries(aggregatedWines.shopResults).forEach(([key, value]) => {
  //     if (value.foundedItems === 0 ) {
  //       delete aggregatedWines.shopResults[key]
  //     }
  //   })
  //
  //   const shopCounts = Object.entries(aggregatedWines.shopResults).length;
  //
  //   aggregatedWines.shopCounts = shopCounts;
  //
  //   if (shopCounts === 0) {
  //     aggregatedWines.status = 'empty';
  //   } else {
  //     aggregatedWines.status = 'ok';
  //   }
  //
  //   return {...aggregatedWines};
  // };
  //
  // private getListMerchantId(fetchedWines: IFetchedWines) {
  //   let listMerchantId: {[key: string]: [string]} | {} = {};
  //
  //   for (let [key, value] of Object.entries(fetchedWines)) {
  //     let merchantIds = [];
  //
  //     for (let item of value) {
  //       merchantIds.push(item.merchantid);
  //     }
  //
  //     listMerchantId[key] = merchantIds;
  //   }
  //
  //   return listMerchantId;
  // };
  //
  // private checkItemAvailableToAllMerchants(id: string, listMerchantId: {[key: string]: [string]}) {
  //   let flag = true;
  //
  //   for (let value of Object.values(listMerchantId)) {
  //     if (!value.includes(id)) {
  //       flag = false;
  //       break;
  //     }
  //   }
  //
  //   return flag;
  // };
  //
  // private delayUntilNextRequest(ms: number) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // };
}