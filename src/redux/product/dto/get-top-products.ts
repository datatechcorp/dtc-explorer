import { IsOptional, IsString } from 'class-validator';

export class GetTopProductsQuery {
  @IsString()
  @IsOptional()
  public country: string;
}
