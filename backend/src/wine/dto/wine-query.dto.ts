import { IsArray, IsNotEmpty, IsString } from "class-validator";

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

  @IsString()
  @IsNotEmpty()
  uniqueQuery: string

  @IsString()
  @IsNotEmpty()
  country: 'de' | 'at' | 'ch' | 'us';

  @IsString()
  @IsNotEmpty()
  orderBy: 'standard' | 'priceasc';

  @IsString()
  @IsNotEmpty()
  numberOfItems: '10' | '20' | '50' | '100'
}