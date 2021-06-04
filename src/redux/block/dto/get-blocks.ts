import { Min, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export type BlockSortField = 'timeStamp' | 'blockNumber';

export class GetBlocksDto {
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
