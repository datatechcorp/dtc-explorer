import { Length, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateEnterpriseDto {
  @IsString({
    message: 'You must enter a name',
  })
  @Length(3, 300, {
    message: 'Invalid name',
  })
  @Expose()
  enterprise_name: string;

  @IsString({
    message: 'You must enter an address',
  })
  @Length(3, 300, {
    message: 'Invalid address',
  })
  @Expose()
  enterprise_address: string;

  @Expose()
  @IsString({
    message: 'You must select enterprise logo',
  })
  @Length(3, 300, {
    message: 'Invalid link',
  })
  enterprise_logo: string;
}
