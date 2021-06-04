import { IsString, IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchProductsDto {
  @IsString()
  text: string;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page: number;

  @IsNumber()
  @Min(5)
  @Type(() => Number)
  limit: number;

  @IsString()
  @IsOptional()
  country: string;
}
