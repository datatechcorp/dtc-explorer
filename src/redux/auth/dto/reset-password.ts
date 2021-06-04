import { IsEmail, Length, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class ResetPasswordDto {
  @IsEmail()
  @Expose()
  public email: string;

  @IsString()
  @Expose()
  @Length(4, 4)
  public code: string;

  @IsString({
    message: 'Password must be string',
  })
  @Length(6, 40, {
    message: 'Password has from 6 to 40 characters',
  })
  @Expose()
  public password: string;

  @IsString({
    message: 'Confirm password must be string',
  })
  @Length(6, 40, {
    message: 'Confirm password has from 6 to 40 characters',
  })
  @Expose()
  public confirmPassword: string;
}
