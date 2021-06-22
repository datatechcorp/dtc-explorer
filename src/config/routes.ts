import { ComponentClass, FunctionComponent } from 'react';
import { ValidateResult } from '../components/AuthRoute';
import { AuthLayout, MainLayout } from '../layouts';
import { UserStatus } from '../models/user';
import { ForgotPassword } from '../pages/ForgotPassword';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Connect } from '../pages/Connect';
import { Wallet } from '../pages/Wallet';
import { Register } from '../pages/Register';
import { UserState } from '../redux/user';
import { routeName } from './route-name';
import { Withdraw } from '../pages/Withdraw';
import { CreateToken } from '../pages/Token';
import { Transaction } from '../pages/Transaction';
import { AccountAddress } from '../pages/AccountAddress';
import { TokenRecord } from '../pages/TokenRecord';

// const isAuthorized = (user: UserState): ValidateResult => {
//   if (user._id) {
//     return { error: null, redirectPath: null };
//   }
//   return { error: 'User not login', redirectPath: routeName.login };
// };

const isAuthorizedAndVerified = (user: UserState): ValidateResult => {
  if (!user._id || !user.info) {
    return { error: 'User not login', redirectPath: routeName.login };
  }
  if (user.info.status === UserStatus.Pending) {
    return { error: 'User not login', redirectPath: routeName.verifyAccount };
  }
  return { error: null, redirectPath: null };
};

const isConnected = (user: UserState): ValidateResult => {
  if (!user.connected || !user.key) {
    return { error: 'User not connect', redirectPath: routeName.connect };
  }
  return { error: null, redirectPath: null };
};
const isGuestOrConnected = (user: UserState): ValidateResult => {
  if (!user.connected) {
    return { error: null, redirectPath: null };
  } else {
    return isConnected(user);
  }
};

// const hasEnterprise = (user: UserState): ValidateResult => {
//   if (!user._id || !user.info) {
//     return { error: 'User not login', redirectPath: routeName.login };
//   }
//   if (user.info.status === UserStatus.Pending) {
//     return { error: 'User not login', redirectPath: routeName.verifyAccount };
//   }
//   if (
//     user.info.kyc_status !== KycStatus.Approved ||
//     !user.info.enterprise_name
//   ) {
//     return { error: 'User not login', redirectPath: routeName.enterprise.info };
//   }
//   return { error: null, redirectPath: null };
// };

// const isAuthorizedAndNotVerified = (user: UserState): ValidateResult => {
//   console.log('user', user);
//   if (!user._id || !user.info) {
//     return { error: 'User not login', redirectPath: routeName.login };
//   }
//   if (user.info.status !== UserStatus.Pending) {
//     return { error: 'User not login', redirectPath: routeName.home };
//   }
//   return { error: null, redirectPath: null };
// };

const isUnauthorized = (user: UserState): ValidateResult => {
  if (!user._id) {
    return { error: null, redirectPath: null };
  }
  return { error: 'User not login', redirectPath: routeName.home };
};

// const isAny = (user: UserState): ValidateResult => {
//   return { error: null, redirectPath: null };
// };

const isGuestOrAuthorizedAndVerified = (user: UserState): ValidateResult => {
  if (!user._id) {
    return { error: null, redirectPath: null };
  } else {
    return isAuthorizedAndVerified(user);
  }
};

export interface RouteConfig {
  path: string;
  exact?: boolean;
  component: ComponentClass<any> | FunctionComponent<any>;
  validate: (user: UserState) => ValidateResult;
  layout: typeof AuthLayout | typeof MainLayout;
}

export const routes: RouteConfig[] = [
  {
    path: routeName.connect,
    component: Connect,
    layout: AuthLayout,
    validate: isUnauthorized,
  },
  {
    path: routeName.login,
    component: Login,
    layout: AuthLayout,
    validate: isUnauthorized,
  },
  {
    path: routeName.register,
    component: Register,
    layout: AuthLayout,
    validate: isUnauthorized,
  },
  {
    path: routeName.forgotPassword,
    component: ForgotPassword,
    layout: AuthLayout,
    validate: isUnauthorized,
  },
  {
    path: routeName.home,
    component: Home,
    exact: true,
    layout: MainLayout,
    // layout: LoaderLayout,
    validate: isGuestOrConnected,
  },
  {
    path: routeName.wallet,
    component: Wallet,
    layout: MainLayout,
    validate: isConnected,
  },
  {
    path: routeName.withdraw,
    component: Withdraw,
    layout: MainLayout,
    validate: isConnected,
  },
  {
    path: routeName.createToken,
    component: CreateToken,
    layout: MainLayout,
    validate: isConnected,
  },
  {
    path: routeName.tokenRecord,
    component: TokenRecord,
    layout: MainLayout,
    validate: isConnected,
  },
  {
    path: routeName.transaction,
    component: Transaction,
    layout: MainLayout,
    validate: isConnected,
  },
  {
    path: routeName.accountAddress,
    component: AccountAddress,
    layout: MainLayout,
    validate: isConnected,
  },
  /**
   * Enterprise route
   *
   */
];
