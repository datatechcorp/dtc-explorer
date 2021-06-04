import { IsMongoId, IsEnum, IsString, IsOptional } from 'class-validator';
import { Type, Expose } from 'class-transformer';
import { PaymentMethod } from '../../../models/order';

export class CreateOrderFromCartDto {
  @IsMongoId()
  @Expose()
  public address_id: string;

  @IsMongoId()
  @Expose()
  public cart_id: string;

  @IsEnum(PaymentMethod)
  @Expose()
  public payment_method: PaymentMethod;

  @IsString()
  @IsOptional()
  @Expose()
  public discount_code: string;
}
