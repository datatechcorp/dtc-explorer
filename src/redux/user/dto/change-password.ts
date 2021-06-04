import { Length, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class ChangePasswordDto {
  @IsString()
  @Length(6, 40, { message: 'Password must be at least 6 characters' })
  @Expose()
  public password: string;

  @IsString()
  @Expose()
  @Length(6, 40, { message: 'Password must be at least 6 characters' })
  public new_password: string;
}
