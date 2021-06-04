import { IsOptional, IsDate, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class GetPriceHistoryDto {
  @IsDate()
  @Expose()
  @IsOptional()
  start_time?: Date;

  @IsDate()
  @Expose()
  @IsOptional()
  end_time?: Date;

  @IsString()
  @IsOptional()
  @Expose()
  type?: string;
}
