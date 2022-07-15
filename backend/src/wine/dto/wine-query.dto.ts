import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class WineQueryDto {
  @IsArray()
  @IsString({each: true})
  queries: string[];

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