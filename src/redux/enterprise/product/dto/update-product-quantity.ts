import { IsNumber, IsMongoId, ValidateNested } from 'class-validator';
import { Type, Expose } from 'class-transformer';

export class ProductQuantityDto {
  @IsMongoId()
  @Expose()
  public _id: string;

  @IsNumber()
  @Type(() => Number)
  @Expose()
  public delta_quantity: number;
}

export class UpdateManyProductQuantityDto {
  @ValidateNested()
  @Type(() => ProductQuantityDto)
  @Expose()
  public products: ProductQuantityDto[];
}
