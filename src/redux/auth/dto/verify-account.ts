import { IsEmail, Length, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class VerifyAccountDto {
  @IsEmail()
  @Expose()
  public email: string;

  @IsString()
  @Length(4, 4)
  @Expose()
  public code: string;
}
