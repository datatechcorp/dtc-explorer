import { IsString, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { DevicePlatform, DeviceStatus } from '../user.interface';

export class AddOrUpdateDeviceDto {
  @IsString()
  @Expose()
  public token: string;

  @IsEnum(DevicePlatform)
  @Expose()
  public platform: DevicePlatform;

  @IsEnum(DeviceStatus)
  @Expose()
  public status: DeviceStatus;
}
