import {
  IsEnum,
  IsString,
  Length,
  IsMongoId,
  IsOptional,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { AddressType } from '../../../models/address';

export class AddressDto {
  @IsMongoId()
  @IsOptional()
  @Expose()
  public _id: string;

  @IsString()
  @Length(6, 100)
  @Expose()
  public address: string;

  // @IsString()
  // @Length(4, 100)
  // @Expose()
  // @IsOptional()
  // public apartment: string;

  @IsString()
  @Length(4, 100)
  @Expose()
  public city: string;

  @IsString({
    message: 'You have to select country',
  })
  @Length(1, 100, {
    message: 'You have to select country',
  })
  @Expose()
  public country: string;

  // @IsString({ message: 'Postal code is invalid' })
  // @Length(1, 100, {
  //   message: 'Postal code is invalid',
  // })
  // @Expose()
  // @IsOptional()
  // public postal_code: string;

  @IsString({
    message: 'First name is invalid',
  })
  @Length(2, 50, {
    message: 'First name must be have from 2 to 50 characters',
  })
  @Expose()
  public first_name: string;

  @IsString({
    message: 'Last name must be have from 2 to 50 characters',
  })
  @Length(2, 50, {
    message: 'Last name must be have from 2 to 50 characters',
  })
  @Expose()
  public last_name: string;

  @IsString()
  @Length(6, 25)
  @Expose()
  public phone: string;

  @IsEnum(AddressType)
  @Expose()
  public type: AddressType;
}
