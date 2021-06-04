import { Min, IsNumber } from 'class-validator';
import { Type, Expose } from 'class-transformer';

export class SwapDto {
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Expose()
  public amount: number;
}
