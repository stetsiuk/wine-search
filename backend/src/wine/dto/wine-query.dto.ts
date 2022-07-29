import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { WineCountries } from '../wine.interface';

export class Query {
  @IsString()
  name?: string

  @IsString()
  producer?: string

  @IsString()
  year?: string
}

export class WineQueryDto {
  @IsArray()
  @IsNotEmpty()
  queries: Query[];

  // @IsString()
  // @IsNotEmpty()
  // uniqueQuery: string

  @IsEnum(
      WineCountries,
      {message: `The following countries are currently available for search: ${Object.values(WineCountries)}`}
  )
  country: WineCountries
}