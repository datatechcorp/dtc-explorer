import { AuthState } from './auth.interface';
import { CountryStatus } from '../../models/country';

export const initialState: AuthState = {
  returnUrl: null,
  isFetching: false,
  authForm: {
    usernameOrEmail: '',
    usernameOrEmailError: undefined,
    first_name: '',
    first_nameError: undefined,
    last_name: '',
    last_nameError: undefined,
    username: '',
    usernameError: undefined,
    phone: '',
    phoneError: undefined,
    password: '',
    passwordError: undefined,
    email: '',
    emailError: undefined,
    confirmPassword: '',
    confirmPasswordError: undefined,
    code: '',
    codeError: undefined,
    token: '',
    tokenError: undefined,
    invitationInfo: null,
    isFetchingInvitationInfo: false,
    invitation_code: '',
    invitation_codeError: null,
    country: {
      phone: '',
      name: 'Country',
      _id: '',
      code: '',
      languages: [],
      status: CountryStatus.Disabled,
    },
    countryError: null,
    requiredTwoFa: false,
  },
  connectForm: {
    key: '',
    keyError: null,
  },
};
