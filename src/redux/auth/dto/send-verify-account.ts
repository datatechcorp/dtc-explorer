import { IsEmail } from 'class-validator';
import { Expose } from 'class-transformer';

export class SendVerifyAccountDto {
  @IsEmail()
  @Expose()
  public email: string;
}
