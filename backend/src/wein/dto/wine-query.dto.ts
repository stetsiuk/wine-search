import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class WineQueryDto {
  @IsArray()
  readonly queryItems: Array<string>;

  @IsString()
  @IsNotEmpty()
  readonly country: string;

  @IsString()
  @IsNotEmpty()
  readonly orderBy: string;

  @IsString()
  @IsNotEmpty()
  readonly numberOfItems: string
}