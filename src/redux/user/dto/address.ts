import {
  Length,
  IsString,
  IsEnum,
  IsObject,
  IsOptional,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { AddressType } from '../../../models/address';

export class AddressDto {
  @IsString()
  @Length(6, 40)
  @Expose()
  public address: string;

  // @IsString()
  // @Length(4, 40)
  // @Expose()
  // @IsOptional()
  // public apartment: string;

  @IsString()
  @Length(4, 40)
  @Expose()
  public city: string;

  @IsString()
  @Length(4, 40)
  @Expose()
  public country: string;

  // @IsString()
  // @Length(4, 40)
  // @Expose()
  // @IsOptional()
  // public postal_code: string;

  @IsString()
  @Length(4, 40)
  @Expose()
  public country_code: string;

  @IsEnum(AddressType)
  @Expose()
  public type: AddressType;
}
