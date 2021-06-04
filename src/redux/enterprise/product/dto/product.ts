import {
  IsString,
  Length,
  IsNumber,
  Min,
  IsBoolean,
  IsMongoId,
} from 'class-validator';
import { Type, Expose } from 'class-transformer';

export class ProductDto {
  @IsString()
  @Length(4, 200)
  @Expose()
  public name: string;

  @IsString()
  @Length(4, 1000)
  @Expose()
  public description: string;

  @IsString()
  @Length(4, 10000, {
    message: 'Full description must be longer than 4 characters',
  })
  @Expose()
  public full_description: string;

  @IsString()
  @Length(1, 100)
  @Expose()
  public sku: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @Expose()
  public price: number;

  @IsBoolean()
  @Type(() => Boolean)
  @Expose()
  public is_limit_quantity: boolean;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @Expose()
  public quantity: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @Expose()
  public discount_rate: number;

  @IsString()
  @Expose()
  public thumbnail: string;

  @IsString({
    each: true,
  })
  @Expose()
  public images: string[];

  @IsMongoId()
  @Expose()
  public category: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @Expose()
  public international_shipping_fee: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @Expose()
  public national_shipping_fee: number;
}
