import {
  Min,
  IsNumber,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum GetProductsType {
  BestSales = 'best-sales',
  BestDiscount = 'best-discount',
  New = 'new',
  LowPrice = 'low-price',
  HighPrice = 'high-price',
}

export class GetProductsDto {
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page: number;

  @IsEnum(GetProductsType)
  type: GetProductsType;

  @IsNumber()
  @Min(5)
  @Type(() => Number)
  limit: number;

  @IsMongoId()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  text: string;

  @IsString()
  @IsOptional()
  country: string;
}
