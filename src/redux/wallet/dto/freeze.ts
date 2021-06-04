import { IsNumber, Min } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class FreezeDto {
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Expose()
  public amountToFreeze: number;
}
