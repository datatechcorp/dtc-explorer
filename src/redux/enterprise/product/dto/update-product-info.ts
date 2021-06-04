import {
  IsString,
  Length,
  IsNumber,
  Min,
  IsMongoId,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Type, Expose } from 'class-transformer';
import { ProductStatus } from '../product.interface';

export class UpdateProductInfoDto {
  @IsMongoId()
  @Expose()
  public _id: string;

  @IsString()
  @Length(4, 200)
  @Expose()
  @IsOptional()
  public name: string;

  @IsString()
  @Length(4, 1000)
  @Expose()
  @IsOptional()
  public description: string;

  @IsString()
  @Length(4, 10000)
  @Expose()
  @IsOptional()
  public full_description: string;

  @IsString()
  @Length(1, 100)
  @Expose()
  @IsOptional()
  public sku: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @Expose()
  @IsOptional()
  public price: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @Expose()
  public quantity: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @Expose()
  @IsOptional()
  public discount_rate: number;

  @IsString()
  @Expose()
  @IsOptional()
  public thumbnail: string;

  @IsString({
    each: true,
  })
  @Expose()
  @IsOptional()
  public images: string[];

  @IsMongoId()
  @Expose()
  @IsOptional()
  public category: string;

  @IsEnum(ProductStatus)
  @IsOptional()
  @Expose()
  public status: ProductStatus;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @Expose()
  @IsOptional()
  public international_shipping_fee: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @Expose()
  @IsOptional()
  public national_shipping_fee: number;
}
