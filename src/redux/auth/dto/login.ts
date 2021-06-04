import { Length, IsString, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class LoginDto {
  @IsString({
    message: 'Password must be string',
  })
  @Length(6, 40, {
    message: 'Password has from 6 to 40 characters',
  })
  @Expose()
  public password: string;

  @IsString()
  @Length(4, 100)
  @IsOptional()
  @Expose()
  public usernameOrEmail: string;

  @IsString()
  @Length(4, 20, { message: 'Token invalid' })
  @IsOptional()
  @Expose()
  public token: string;
}
