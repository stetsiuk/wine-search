import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Wine } from './wine.entity';
import { WineQueryDto } from './dto/wine-query.dto';
import { IAggregateWines, IFetchedWines, IWine, IWineApiResponse } from './wine.interface';
import { WEIN_CC_API_URL, WEIN_CC_WINE_IMG_URL } from './wine.constants';
import { SearchService } from '../search/search.service';
import { CategoryService } from '../category/category.service';
import { ProducerService } from '../producer/producer.service';
import { PartnerService } from '../partner/partner.service';
import { MerchantService } from '../merchant/merchant.service';
import { SortService } from '../sort/sort.service';

@Injectable()
export class WineService {
  constructor(
      @InjectRepository(Wine) private wineRepository: Repository<Wine>,
      private readonly httpService: HttpService,
      private readonly searchService: SearchService,
      private readonly categoryService: CategoryService,
      private readonly sortService: SortService,
      private readonly producerService: ProducerService,
      private readonly partnerService: PartnerService,
      private readonly merchantService: MerchantService
  ) {}

  public async getWineByArticleNumber (articleNumber: string) {
    return await this.wineRepository.findOne( { where: { articleNumber: articleNumber } } );
  }

  public async selectWines (dto: WineQueryDto) {

  }

  public async collectWines (dto: WineQueryDto) {
    try {
      const wasSearchMade = await this.searchService.checkWasSearchRequestMadeForPeriod(dto.uniqueQuery, 2);

      const newSearch = await this.searchService.create(dto.uniqueQuery);

      if (!wasSearchMade) {
        await this.fetchWinesFromApi(dto);
      }

      // return await this.selectWines(dto);

      return 'good'

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
      }

    } catch (e) {

    }
  }

  private async createWinesFromApi(wines: IWine[]) {
    try {

      const winePartner = await this.partnerService.getPartnerById(1)

      for (let i = 0; i < wines.length; i++) {
        const wine = wines[i];

        const isWineAvailable = await this.getWineByArticleNumber(wine.artikelnummer);

        if (!isWineAvailable) {

          const wineVintage = (wine.jahrgang === '' || wine.jahrgang === '0') ? null : Number(wine.jahrgang);
          const wineAlcohol = (wine.alk === 0 || typeof wine.alk !== 'number') ? null : Number(wine.alk);

          const wineCategories = await this.categoryService.createAndGetCategoriesFromApi(wine.kategorie);
          const wineSorts = await this.sortService.createAndGetSortsFromApi(wine.rebsorte);
          const wineProducer = await this.producerService.createAndGetProducerFromApi(wine.produzent);
          const wineMerchant = await this.merchantService.createAndGetMerchant(wine.merchanturl);

          const createdWine = this.wineRepository.create({
            name: wine.produktname,
            articleNumber: wine.artikelnummer,
            vintage: wineVintage,
            price: wine.preis === 0 ? null : wine.preis,
            alcohol: wineAlcohol,
            volume: wine.liter === 0 ? null : wine.liter,
            quantity: Number(wine.quantity),
            merchant: wineMerchant,
            partner: winePartner,
            producer: wineProducer,
            categories: wineCategories,
            sorts: wineSorts,
            affiliateLink: null,
            imageUrl: WEIN_CC_WINE_IMG_URL(wine.id),
            land: wine.land === '' ? null : wine.land,
            region: wine.region === '' ? null : wine.region,
            ean: wine.ean === '' ? null : wine.ean
          })

          await this.wineRepository.save(createdWine)
        }
      }
    } catch (e) {

    }
  }

  public async initVinocentral () {
    const file = fs.readFileSync(path.resolve(__dirname, '..', '..', '..', 'vinocentral.json'));

    const winePartner = await this.partnerService.getPartnerById(2)
    // @ts-ignore
    const info = JSON.parse(file);
    for (let i = 0; i < info.length; i++) {
      const obj = info[i];

      const wineCategories = await this.categoryService.createAndGetCategoriesFromApi(obj.category);
      const wineProducer = await this.producerService.createAndGetProducerFromApi(obj.producer);
      const wineMerchant = await this.merchantService.createAndGetMerchant(obj.merchantUrl)

      const createdWine = this.wineRepository.create({
        articleNumber: uuidv4(),
        name: obj.name,
        vintage: obj.vintage,
        price: obj.price,
        alcohol: obj.price,
        volume: obj.volume,
        quantity: obj.quantity,
        categories: wineCategories,
        sorts: null,
        producer: wineProducer,
        merchant: wineMerchant,
        partner: winePartner,
        affiliateLink: obj.affiliateLink,
        imageUrl: obj.imageUrl === '' ? null : obj.imageUrl,
        land: obj.land,
        region: obj.region,
        ean: obj.ean
      })

      await this.wineRepository.save(createdWine)
    }

    return 'ok'

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