import { IsNumber, IsString, Min, IsEnum } from 'class-validator';
import { Type, Expose } from 'class-transformer';
import { Currency } from '../../../models/balance';

export class PayOrderWithoutProductDto {
  @IsEnum(Currency)
  @Expose()
  public type: Currency;

  @IsNumber()
  @Expose()
  @Type(() => Number)
  @Min(0.001, {
    message: 'Minium transfer amount 0.001',
  })
  public amount: number;

  @IsString()
  @Expose()
  public username_or_email: string;
}
