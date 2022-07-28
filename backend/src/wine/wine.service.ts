import * as fs from 'fs';
import * as path from 'path';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { LessThan, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Wine } from './wine.entity';
import { WineQueryDto } from './dto/wine-query.dto';
import { createDynamicTypeOrmWhereQueries } from './wine.utils';
import { WEIN_CC_API_URL, WEIN_CC_WINE_IMG_URL, WEIN_CC_WINE_URL } from './wine.constants';
import {
  ISelectedWines,
  IWine,
  IWineApiResponse,
  IWineData,
  WineCountries
} from './wine.interface';
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

  public async getWineByArticleNumberAndCountry (articleNumber: string, country: WineCountries) {
    return await this.wineRepository.findOne( { where: { articleNumber: articleNumber, country: country } } );
  }

  public async collectWines (dto: WineQueryDto) {

    const wasSearchMade = await this.searchService.checkWasSearchRequestMadeForPeriod(dto.uniqueQuery, dto.country, 24);

    if (!wasSearchMade) {
      await this.fetchWinesFromApi(dto);
    }

    await this.searchService.create(dto.uniqueQuery, dto.country);

    return await this.selectWines(dto);
  }

  private async fetchWinesFromApi (dto: WineQueryDto) {
    try {
      const {uniqueQuery, country} = dto;

      const {data} = await this.httpService.axiosRef.get<IWineApiResponse>(`${WEIN_CC_API_URL}/${uniqueQuery}/${country}/standard/100`, {
        auth: {
          username: String(process.env.API_WEIN_USERNAME),
          password: String(process.env.API_WEIN_PASSWORD)
        }
      });

      if (data.status === 'ok') {
        const wines = [...Object.values(data.result)];

        return await this.createWinesFromApi(wines, country);

      } else if (data.status === 'error') {
        throw new BadGatewayException(`Error ${data.result}`);
      }
      throw new BadGatewayException(String(data));
    } catch (e) {
     throw new BadGatewayException(e.message);
    }
  }

  private async createWinesFromApi(wines: IWine[], country: WineCountries) {

    const winePartner = await this.partnerService.getPartnerById(1)

    for (let i = 0; i < wines.length; i++) {
      const wine = wines[i];

      const isWineAvailable = await this.getWineByArticleNumberAndCountry(wine.artikelnummer, country);

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
          alcohol: wineAlcohol,
          price: wine.preis === 0 ? null : wine.preis,
          volume: wine.liter === 0 ? null : wine.liter,
          quantity: Number(wine.quantity),
          merchant: wineMerchant,
          partner: winePartner,
          producer: wineProducer,
          categories: wineCategories,
          sorts: wineSorts,
          link: WEIN_CC_WINE_URL(country, wine.id, wine.merchantid),
          imageUrl: WEIN_CC_WINE_IMG_URL(wine.id),
          land: wine.land === '' ? null : wine.land,
          region: wine.region === '' ? null : wine.region,
          country: country,
          ean: wine.ean === '' ? null : wine.ean
        })

        await this.wineRepository.save(createdWine)
      }
    }
  }

  private async selectWines (dto: WineQueryDto) {
    const {queries, country} = dto;

    let selectedWines: ISelectedWines = {};

    for (let i = 0; i < queries.length; i++) {

      const searchWine = await this.wineRepository.find({
        where: createDynamicTypeOrmWhereQueries(queries[i], country)
      });

      const key = Object.values(queries[i]).join('--')

      selectedWines[key] = searchWine;
    }

    const aggregatedWines = await this.aggregateWines(selectedWines);

    return this.sortWines(aggregatedWines);
  }

  private async aggregateWines (wines: ISelectedWines) {

    let foundMerchants: string[][] = [];

    for (let value of Object.values(wines)) {
      let sectionMerchants = [];

      value.forEach(item => {
        const merchant = item.merchant.name;

        if (!sectionMerchants.includes(merchant)) {
          sectionMerchants.push(merchant);
        }
      });

      foundMerchants.push(sectionMerchants);
    }

    const data: IWineData = {
      multipleMatch: [],
      singleMatch: []
    };

    for (let key of Object.keys(wines)) {
      for (let i = 0; i < wines[key].length; i++) {

        const wine = wines[key][i];
        const wineMerchant = wine.merchant.name;
        const isMerchantAffiliated = Boolean(wine.partner.id !== 1)
        const isMultipleMerchant = this.checkIsMultipleMerchant(wineMerchant, foundMerchants);
        const path = isMultipleMerchant ? 'multipleMatch' : 'singleMatch';

        const event = (item) => item.name === wineMerchant
        if (!data[path].some(event)) {
          data[path].push({
            name: wineMerchant,
            isAffiliated: isMerchantAffiliated,
            amountWines: 0,
            wines: {}
          })
        }

        data[path].forEach((item, index) => {
          if (item.name === wineMerchant) {
            if (data[path][index].wines.hasOwnProperty(key)) {
              // @ts-ignore
              data[path][index].wines[key].push(wine);
            } else {
              data[path][index].wines[key] = [wine];
            }
            data[path][index].amountWines += 1
          }
        })
      }
    }

    return data;
  }

  private sortWines (wines: IWineData) {

    for (let key of Object.keys(wines)) {
      wines[key].sort((a, b) => b.amountWines - a.amountWines);
    }

    for (let key of Object.keys(wines)) {
      wines[key].sort((a, b) => Number(b.isAffiliated) - Number(a.isAffiliated));
    }

    return wines;
  }

  private checkIsMultipleMerchant (merchant, listMerchants) {
    let flag = true;

    listMerchants.forEach((item) => {
      if (!item.includes(merchant)) {
        flag = false;
      }
    })
    return flag
  }

  @Cron('0 0 0 * * *')
  private async deleteExpiredWines() {
    const candidatesForDeletion = await this.wineRepository.find({
      where: {
        partner: {
          id: 1
        },
        createdAt: LessThan(new Date().toLocaleString())
      }
    });
    await this.wineRepository.delete(candidatesForDeletion.map(item => item.id));
  }

  public async initVinocentralDB () {
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
        sorts: null,
        categories: wineCategories,
        producer: wineProducer,
        merchant: wineMerchant,
        partner: winePartner,
        link: obj.affiliateLink,
        imageUrl: obj.imageUrl === '' ? null : obj.imageUrl,
        land: obj.land,
        region: obj.region,
        country: WineCountries.De,
        ean: obj.ean
      })

      await this.wineRepository.save(createdWine)
    }
    return 'ok'
  }
}