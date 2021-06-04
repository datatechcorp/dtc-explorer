import { IsString, IsBoolean } from 'class-validator';
import { Type, Expose } from 'class-transformer';

export class ChangeTwoFaStatusDto {
  @IsString()
  @Expose()
  public token: string;

  @IsBoolean()
  @Type(() => Boolean)
  @Expose()
  public active: boolean;
}
