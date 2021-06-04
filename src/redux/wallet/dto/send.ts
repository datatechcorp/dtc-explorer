import { Length, IsString, IsNumber, Min } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class SendDto {
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @Expose()
  public amount: number;

  @IsString()
  @Length(34)
  @Expose()
  public receiver: string;
}
