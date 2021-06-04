import { IsEmail, IsString, Length } from 'class-validator';
import { Expose } from 'class-transformer';

export class AddSupportDto {
  @IsString()
  @Length(10)
  @Expose()
  title: string;

  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @Expose()
  @Length(10)
  content: string;
}
