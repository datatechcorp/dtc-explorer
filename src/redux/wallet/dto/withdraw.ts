import {
  IsNumber,
  Min,
  IsString,
  Length,
  IsEnum,
  IsOptional,
  IsMongoId,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class WithdrawDto {
  @IsMongoId()
  @Expose()
  public wallet_id: string;

  @IsNumber()
  @Type(() => Number)
  @Expose()
  @Min(0, {
    message: 'Amount must be greater than 0',
  })
  public amount: number;

  @IsString()
  @Expose()
  @Length(4)
  public address: string;
}
