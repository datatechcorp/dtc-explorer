import { IsNumber, Min, IsMongoId } from 'class-validator';
import { Type, Expose } from 'class-transformer';

export class LendingDto {
  @IsNumber()
  @Expose()
  @Min(50, {
    message: 'Minimum is 50.00',
  })
  @Type(() => Number)
  public amount_usd: number;

  @IsMongoId()
  @Expose()
  public wallet_id: string;
}
