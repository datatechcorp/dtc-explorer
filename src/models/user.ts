import { Country } from './country';

export enum UserLevel {
  None = 0,
}
export const UserLevelName = {
  0: 'None',
};

export enum UserType {
  Enterprise = 'enterprise',
  Investor = 'investor', //will remove soon
  Customer = 'customer',
  Other = 'other',
}

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

export enum UserStatus {
  Pending = 'pending',
  Blocked = 'blocked',
  Active = 'active',
}

export enum KycStatus {
  None = 'none',
  Pending = 'pending',
  Rejected = 'rejected',
  Approved = 'approved',
}

export enum KycType {
  Nic = 'nic',
  Passport = 'passport',
}

export enum EnterpriseStatus {
  None = 'none',
  Pending = 'pending',
  Active = 'active',
  Blocked = 'blocked',
}
export interface UserInfo {
  display_name: string;
  business_name?: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  type: UserType;
  status: UserStatus;
  _id: string;
  username: string;
  email: string;
  phone: string;
  sponsor: string;
  sponsor_info?: UserInfo;
  createdAt: Date;
  updatedAt: Date;
  country: string | Country;
  country_name: string;
  country_code: string;
  country_phone: string;

  security_version: number;
  address?: string;

  total_lending?: number;
  total_swap?: number;
  total_apoint?: number;

  //kyc
  kyc_status?: KycStatus;
  kyc_fullName?: string;
  kyc_birthday?: Date;
  kyc_address?: string;
  kyc_type?: KycType;
  kyc_number?: string;
  kyc_provided_date?: Date;
  kyc_provided_area?: string;
  kyc_front_image?: string;
  kyc_back_image?: string;
  kyc_selfie_image?: string;

  enterprise_name?: string;
  enterprise_logo?: string;
  enterprise_address?: string;
  enterprise_status?: EnterpriseStatus;

  enable_two_fa?: boolean;
}
