import { Length, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateKycDto {
  @IsString()
  @Length(3, 300)
  @Expose()
  kyc_front_image: string;

  @IsString()
  @Length(3, 300)
  @Expose()
  kyc_back_image: string;

  @IsString()
  @Length(3, 300)
  @Expose()
  kyc_selfie_image: string;

  @IsString()
  @Expose()
  @Length(3, 300)
  kyc_number: string;
}
