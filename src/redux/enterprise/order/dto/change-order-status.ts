import { IsMongoId, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { OrderStatus } from '../../../../models/order';

export class ChangeOrderStatusDto {
  @IsMongoId()
  @Expose()
  public _id: string;

  @IsEnum(OrderStatus)
  @Expose()
  public status: OrderStatus;
}
