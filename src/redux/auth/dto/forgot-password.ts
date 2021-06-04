import { IsEmail } from 'class-validator';
import { Expose } from 'class-transformer';

export class ForgotPasswordDto {
  @IsEmail()
  @Expose()
  public email: string;
}
