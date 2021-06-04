import { Length, IsString, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class ChangeUserInfoDto {
  @IsString()
  @Length(2, 15, {
    message: 'First name must be at least 2 characters',
  })
  @IsOptional()
  @Expose()
  public first_name?: string;

  @IsString()
  @IsOptional()
  @Expose()
  @Length(2, 30, {
    message: 'Last name must be at least 2 characters',
  })
  public last_name?: string;

  @IsString()
  @IsOptional()
  @Expose()
  @Length(6, 16, {
    message: 'Phone is invalid',
  })
  public phone?: string;

  @IsString()
  @IsOptional()
  @Expose()
  @Length(3, 30, {
    message: 'Display name must be at least 3 characters',
  })
  public display_name?: string;

  @IsString()
  @IsOptional()
  @Expose()
  @Length(3, 30, {
    message: 'Business name must be at least 3 characters',
  })
  public business_name?: string;
}
