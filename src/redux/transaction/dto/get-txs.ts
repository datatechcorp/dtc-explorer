import { Min, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export type TxSortField = 'timeStamp' | 'blockNumber';

export class GetTxsDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsString()
  sort: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  start: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  block: number;
}
