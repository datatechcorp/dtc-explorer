import {
  IsEmail,
  Length,
  IsString,
  IsOptional,
  IsMongoId,
  Matches,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class RegisterDto {
  @IsEmail(undefined, {
    message: 'Email is invalid',
  })
  @Expose()
  public email: string;

  @IsString({
    message: 'First name must be string',
  })
  @Length(2, 15, {
    message: 'First name has from 2 to 15 characters',
  })
  @Expose()
  public first_name: string;

  @IsString({
    message: 'Last name must be string',
  })
  @Length(2, 30, {
    message: 'Last name has from 2 to 30 characters',
  })
  @Expose()
  public last_name: string;

  @IsString()
  @Length(6, 15, {
    message: 'Phone is invalid',
  })
  @Expose()
  public phone: string;

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

  @Matches(/^[a-zA-Z0-9.\-_]{4,40}$/, 'i', {
    message: 'Username is invalid',
  })
  @Expose()
  public username: string;

  @Expose()
  @IsOptional()
  @IsString()
  public invitation_code: string;

  @Expose()
  @IsMongoId({
    message: 'You must select country',
  })
  public country: string;
}
