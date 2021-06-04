import { IsString, IsNumber, Min, Max } from 'class-validator';
import { Type, Expose } from 'class-transformer';

export class CreateOrderWithoutProductDto {
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Expose()
  public amount: number;

  @IsString()
  @Expose()
  public payment_code: string;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @Max(1)
  @Expose()
  public refund_rate: number;
}
