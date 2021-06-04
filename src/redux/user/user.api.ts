import { BaseResponse, commonApi } from '../common';
import { UserInfo } from '../../models/user';
import {
  ChangeUserInfoDto,
  ChangePasswordDto,
  AddressDto,
  ChangeTwoFaStatusDto,
  UpdateKycDto,
  UpdateEnterpriseDto,
  AddOrUpdateDeviceDto,
} from './dto';
import { Address } from '../../models/address';

function getMyInfo(): Promise<BaseResponse<UserInfo> | null> {
  const api = '/user/me';
  return commonApi.fetchData<UserInfo>(api);
}

function updateUserInfo(
  data: ChangeUserInfoDto,
): Promise<BaseResponse<UserInfo> | null> {
  const api = '/user/update';
  return commonApi.fetchData<UserInfo>(api, 'post', data);
}

function changePassword(
  data: ChangePasswordDto,
): Promise<BaseResponse<UserInfo> | null> {
  const api = '/user/change-password';
  return commonApi.fetchData<UserInfo>(api, 'post', data);
}

function getMyAddresses(): Promise<BaseResponse<Address[][]> | null> {
  const api = '/address/me';
  return commonApi.fetchData<Address[][]>(api);
}

function updateAddress(data: AddressDto): Promise<BaseResponse<any> | null> {
  const api = '/address/update-or-create';
  return commonApi.fetchData<any>(api, 'post', data);
}

function getMyChildren(): Promise<BaseResponse<UserInfo[][]> | null> {
  const api = '/user/my-children';
  return commonApi.fetchData<UserInfo[][]>(api);
}

function getTwoFaUri(): Promise<BaseResponse<string> | null> {
  const api = '/user/get-2fa-uri';
  return commonApi.fetchData<string>(api);
}

function setupTwoFa(
  data: ChangeTwoFaStatusDto,
): Promise<BaseResponse<any> | null> {
  const api = '/user/change-2fa-status';
  return commonApi.fetchData<any>(api, 'post', data);
}

function updateKyc(data: UpdateKycDto): Promise<BaseResponse<UserInfo> | null> {
  const api = '/user/update-kyc';
  return commonApi.fetchData<UserInfo>(api, 'post', data);
}

function updateEnterprise(
  data: UpdateEnterpriseDto,
): Promise<BaseResponse<UserInfo> | null> {
  const api = '/user/update-enterprise';
  return commonApi.fetchData<UserInfo>(api, 'post', data);
}

function addOrUpdateDevice(
  data: AddOrUpdateDeviceDto,
): Promise<BaseResponse<any> | null> {
  const api = '/device/add-or-update';
  return commonApi.fetchData<any>(api, 'post', data);
}

function getLatestUsers(limit): Promise<BaseResponse<UserInfo[]> | null> {
  const api = '/user/public' + commonApi.formatQuery({ limit });
  return commonApi.fetchData<UserInfo[]>(api);
}
export const userApi = {
  getMyInfo,
  updateUserInfo,
  changePassword,
  getMyAddresses,
  updateAddress,
  getMyChildren,
  getTwoFaUri,
  setupTwoFa,
  updateKyc,
  updateEnterprise,
  addOrUpdateDevice,
  getLatestUsers,
};
