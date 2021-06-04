import {
  Length,
  IsString,
  IsNumber,
  IsEnum,
  Min,
  IsOptional,
  IsMongoId,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class TransferDto {
  @IsMongoId()
  @Expose()
  public wallet_id: string;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Expose()
  public amount: number;

  @IsString()
  @Length(4)
  @Expose()
  public username_or_email: string;
}
