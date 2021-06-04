import { BaseResponse, commonApi } from '../common';
import {
  RegisterDto,
  LoginDto,
  VerifyAccountDto,
  SendVerifyAccountDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './dto';
import { UserInfo } from '../../models/user';

export interface LoginResponse extends UserInfo {
  access_token: string;
}

function login(data: LoginDto): Promise<BaseResponse<LoginResponse> | null> {
  const api = '/auth/login';
  return commonApi.fetchData<LoginResponse>(api, 'post', data);
}

function loginFromAdmin(
  userId: string,
): Promise<BaseResponse<LoginResponse> | null> {
  const api = '/auth/admin/login-for-user';
  return commonApi.fetchData<LoginResponse>(api, 'post', { _id: userId });
}

function verifyAccount(
  data: VerifyAccountDto,
): Promise<BaseResponse<any> | null> {
  const api = '/auth/verify-email';
  return commonApi.fetchData<any>(api, 'post', data);
}

function sendVerifyAccountEmail(
  data: SendVerifyAccountDto,
): Promise<BaseResponse<any> | null> {
  const api = '/auth/send-verify-email';
  return commonApi.fetchData<any>(api, 'post', data);
}

function forgotPassword(
  data: ForgotPasswordDto,
): Promise<BaseResponse<any> | null> {
  const api = '/auth/forgot-password';
  return commonApi.fetchData<any>(api, 'post', data);
}

function resetPassword(
  data: ResetPasswordDto,
): Promise<BaseResponse<any> | null> {
  const api = '/auth/reset-password';

  const body = { ...data };
  delete body.confirmPassword;
  return commonApi.fetchData<any>(api, 'post', body);
}

function registerUser(data: RegisterDto): Promise<BaseResponse<any> | null> {
  const body = { ...data };
  delete body.confirmPassword;
  const api = '/auth/register';
  return commonApi.fetchData<any>(api, 'post', body);
}

export const authApi = {
  login,
  verifyAccount,
  sendVerifyAccountEmail,
  forgotPassword,
  resetPassword,
  registerUser,
  loginFromAdmin,
};
