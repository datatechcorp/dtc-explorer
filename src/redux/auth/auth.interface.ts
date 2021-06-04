import { Country } from '../../models/country';
import { UserInfo } from '../../models/user';

export enum InvitationType {
  Investor = 'investor',
  Enterprise = 'enterprise',
  Customer = 'customer',
}

export enum InvitationStatus {
  Unused = 'unused',
  Used = 'used',
  Cancelled = 'cancelled',
}

export interface AuthForm {
  usernameOrEmail: string;
  usernameOrEmailError: string | undefined;
  email: string;
  emailError: undefined | string;
  first_name: string;
  first_nameError: undefined | string;
  last_name: string;
  last_nameError: undefined | string;
  phone: string;
  phoneError: undefined | string;
  password: string;
  passwordError: undefined | string;
  confirmPassword: string;
  confirmPasswordError: undefined | string;
  username: string;
  usernameError: undefined | string;
  code: string;
  codeError: undefined | string;
  invitation_code: string;
  invitation_codeError: string | null;
  invitationInfo: null | UserInfo;
  isFetchingInvitationInfo: boolean;
  country: Country;
  countryError: null | string;
  requiredTwoFa: boolean;
  token: string;
  tokenError: undefined | string;
}

export interface ConnectForm {
  key: string;
  keyError: null | string;
}

export interface AuthState {
  isFetching: boolean;
  returnUrl: string | null;
  authForm: AuthForm;
  connectForm: ConnectForm;
}
