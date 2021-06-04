import { IsMongoId } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreatePaymentCodeDto {
  @IsMongoId()
  @Expose()
  public wallet_id: string;
}
