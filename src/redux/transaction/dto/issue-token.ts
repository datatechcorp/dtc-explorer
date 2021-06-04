import { Min, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class IssueTokenDto {
  @IsString()
  address: string;

  @IsString()
  name: string;

  @IsString()
  symbol: string;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  decimals: number;

  @IsString()
  totalSupply: string;
}
