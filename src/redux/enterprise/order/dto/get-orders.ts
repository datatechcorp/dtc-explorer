import { IsEnum, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { OrderStatus } from '../../../../models/order';

export class GetOrdersDto {
  @IsEnum(OrderStatus)
  @IsOptional()
  @Expose()
  public status?: OrderStatus;
}
