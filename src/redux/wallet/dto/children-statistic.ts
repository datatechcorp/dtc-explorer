import { IsDate } from 'class-validator';
import { Type, Transform, Expose } from 'class-transformer';

export class ChildrenStatisticDto {
  @IsDate()
  @Type(() => Date)
  @Transform((value) => new Date(value))
  @Expose()
  public from: Date;

  @IsDate()
  @Type(() => Date)
  @Transform((value) => new Date(value))
  @Expose()
  public to: Date;
}
