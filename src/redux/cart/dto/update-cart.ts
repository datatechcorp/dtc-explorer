import { IsMongoId, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCartDto {
  @IsMongoId()
  public product_id: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  public quantity: number;
}
