import { Action, createAction, AppTypes, commonApi } from '../common';
import { AuthForm } from './auth.interface';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import {
  RegisterDto,
  LoginDto,
  SendVerifyAccountDto,
  VerifyAccountDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './dto';
import utils from '../../utils/utils';
import _ from 'lodash';
import { authApi } from './auth.api';
import { notification } from '../../utils/notification';
import { UserStatus } from '../../models/user';
import { push } from 'connected-react-router';
import { routeName } from '../../config/route-name';
import { userAction, DeviceStatus } from '../user';
import { RootState } from '..';
import { storage } from '../../utils/storage';
import { commonAction } from '../common';
import Axios from 'axios';
import { firebaseUtils } from '../../utils/firebase';
import { sdk } from '../../config/utils';
import { setting } from '../../config/setting';
import { Drc20Token, TokenBase } from '../transaction';

export const Types = {
  changeFields: 'app.auth.change-fields',
};

const changeFields = (object: any = {}): Action =>
  createAction(Types.changeFields, object);

const registerUser =
  (form: AuthForm): Function =>
  async (dispatch: Function): Promise<boolean> => {
    const { errors, data } = await commonAction.validate(
      {
        ...form,
        country: form.country ? form.country._id : undefined,
      },
      RegisterDto,
      'authForm',
    );

    if (
      !errors['authForm.confirmPasswordError'] &&
      form.confirmPassword !== form.password
    ) {
      errors['authForm.confirmPasswordError'] = 'Confirm password is incorrect';
    }

    if (!_.isEmpty(errors)) {
      dispatch(changeFields(errors));
      return false;
    }

    dispatch(
      changeFields({
        isFetching: true,
      }),
    );
    const response = await authApi.registerUser(data);
    dispatch(
      changeFields({
        isFetching: false,
      }),
    );
    if (!response) {
      //todo network error
      notification.error('Please check your network');
      return false;
    }
    if (response.errors && response.errors.length > 0) {
      const errors: any = {};
      response.errors.forEach((item) => {
        if (item.domain === 'username') {
          errors['authForm.usernameError'] = 'Username existed.';
        } else if (item.domain == 'email') {
          errors['authForm.emailError'] = 'Email existed.';
        } else {
          errors[`authForm.${item.domain}Error`] = item.message;
        }
      });
      dispatch(changeFields(errors));
      return false;
    }

    if (response.code !== 200) {
      notification.error(response.message);
      return false;
    }
    // notification.success('Register successfully');
    dispatch(push(routeName.verifyAccount));
    return true;
  };

/**
 * User login
 * @param form
 */
const login =
  (form: AuthForm): Function =>
  async (dispatch: Function, getState): Promise<boolean> => {
    const data = { ...form };
    // if (!data.token) {
    //   delete data.token;
    // }
    const result = await commonAction.validate(data, LoginDto, 'authForm');

    if (!_.isEmpty(result.errors)) {
      dispatch(changeFields(result.errors));
      return false;
    }
    const user = result.data;
    dispatch(
      changeFields({
        isFetching: true,
      }),
    );
    const response = await authApi.login(user);

    if (!response) {
      dispatch(
        changeFields({
          isFetching: false,
        }),
      );
      notification.error('Please check your network');
      return false;
    }

    if (response.code !== 200) {
      dispatch(
        changeFields({
          isFetching: false,
          'authForm.passwordError': 'Username or password is incorrect.',
        }),
      );
      return false;
    }

    let isLoginSuccess = false;
    if (!response.data.access_token) {
      //require 2fa code
      dispatch(
        changeFields({
          isFetching: false,
          'authForm.requiredTwoFa': true,
          'authForm.tokenError': form.token ? 'Invalid token' : null,
        }),
      );
      return false;
    } else if (response.data.status === UserStatus.Pending) {
      dispatch(
        changeFields({
          isFetching: false,
          'authForm.email': response.data.email,
        }),
      );
      dispatch(push(routeName.verifyAccount));
    } else if (response.data.status === UserStatus.Blocked) {
      dispatch(
        changeFields({
          isFetching: false,
          'authForm.passwordError': 'Your account have been blocked.',
        }),
      );
      return false;
    } else {
      Axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.access_token}`;
      isLoginSuccess = true;
    }
    storage.saveUser(response.data, response.data.access_token);

    dispatch(
      changeFields({
        isFetching: false,
      }),
    );
    dispatch(
      userAction.changeFields({
        _id: response.data._id,
        info: response.data,
        access_token: response.data.access_token,
      }),
    );

    firebaseUtils.getNotificationToken().then((token) => {
      if (token) {
        dispatch(userAction.addOrUpdateDevice(token, DeviceStatus.Active));
      }
    });

    const url = getState().auth.returnUrl;
    if (isLoginSuccess && url) {
      dispatch(push(url));
    }

    return true;
  };

const sendVerifyEmail =
  (form: AuthForm): Function =>
  async (dispatch: Function): Promise<boolean> => {
    const errors = {};
    const user = plainToClass(SendVerifyAccountDto, form, {
      excludeExtraneousValues: true,
    });
    const validatedErrors = await validate(user);
    if (validatedErrors.length > 0) {
      validatedErrors.forEach((item) => {
        let message: string | undefined;
        for (const key in item.constraints) {
          if (item.constraints[key]) {
            message = utils.toUpperCaseFirstLetter(item.constraints[key]);
          }
        }
        errors[`authForm.${item.property}Error`] = message;
      });
    }

    if (!_.isEmpty(errors)) {
      dispatch(changeFields(errors));
      return false;
    }

    dispatch(
      changeFields({
        isFetching: true,
      }),
    );
    const response = await authApi.sendVerifyAccountEmail(user);
    dispatch(
      changeFields({
        isFetching: false,
      }),
    );
    if (!response) {
      //todo network error
      notification.error('Please check your network');
      return false;
    }

    if (response.code !== 200) {
      dispatch(
        changeFields({
          'authForm.emailError': 'Email is invalid.',
        }),
      );
      return false;
    }
    notification.success('Send verify email successfully!');
    return true;
  };

const logout =
  () =>
  (dispatch): void => {
    firebaseUtils.getNotificationToken().then((token) => {
      if (token) {
        dispatch(userAction.addOrUpdateDevice(token, DeviceStatus.Blocked));
      }

      dispatch(createAction(AppTypes.reset));
      delete Axios.defaults.headers.common['Authorization'];
      storage.saveUser(null, null);
      storage.saveCountry(null);
      setTimeout(() => {
        window.location.reload();
      }, 500);
      // dispatch(push(routeName.home));
    });
  };

const verifyAccount =
  (form: AuthForm): Function =>
  async (dispatch: Function, getState: Function): Promise<boolean> => {
    const errors = {};
    const user = plainToClass(VerifyAccountDto, form, {
      excludeExtraneousValues: true,
    });
    const validatedErrors = await validate(user);
    if (validatedErrors.length > 0) {
      validatedErrors.forEach((item) => {
        let message: string | undefined;
        for (const key in item.constraints) {
          if (item.constraints[key]) {
            message = utils.toUpperCaseFirstLetter(item.constraints[key]);
          }
        }
        errors[`authForm.${item.property}Error`] = message;
      });
    }

    if (!_.isEmpty(errors)) {
      dispatch(changeFields(errors));
      return false;
    }

    dispatch(
      changeFields({
        isFetching: true,
      }),
    );
    const response = await authApi.verifyAccount(user);
    dispatch(
      changeFields({
        isFetching: false,
      }),
    );
    if (!response) {
      //todo network error
      notification.error('Please check your network');
      return false;
    }

    if (response.code !== 200) {
      dispatch(
        changeFields({
          'authForm.codeError': 'Code is invalid.',
        }),
      );
      return false;
    }

    const rootState: RootState = getState();
    if (rootState.user._id) {
      Axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${rootState.user.access_token}`;
      storage.saveUser(
        { ...rootState.user.info, status: UserStatus.Active },
        rootState.user.access_token,
      );
      dispatch(userAction.changeFields({ 'info.status': UserStatus.Active }));
      dispatch(push(routeName.home));
    } else {
      dispatch(push(routeName.login));
    }
    notification.success('Verify account successfully!');
    return true;
  };

const sendForgotPasswordEmail =
  (form: AuthForm): Function =>
  async (dispatch: Function): Promise<boolean> => {
    const errors = {};
    const user = plainToClass(ForgotPasswordDto, form, {
      excludeExtraneousValues: true,
    });
    const validatedErrors = await validate(user);
    if (validatedErrors.length > 0) {
      validatedErrors.forEach((item) => {
        let message: string | undefined;
        for (const key in item.constraints) {
          if (item.constraints[key]) {
            message = utils.toUpperCaseFirstLetter(item.constraints[key]);
          }
        }
        errors[`authForm.${item.property}Error`] = message;
      });
    }

    if (!_.isEmpty(errors)) {
      dispatch(changeFields(errors));
      return false;
    }

    dispatch(
      changeFields({
        isFetching: true,
      }),
    );
    const response = await authApi.forgotPassword(user);
    dispatch(
      changeFields({
        isFetching: false,
      }),
    );
    if (!response) {
      //todo network error
      notification.error('Please check your network');
      return false;
    }

    if (response.code !== 200) {
      dispatch(
        changeFields({
          'authForm.emailError': 'Email is invalid.',
        }),
      );
      return false;
    }
    notification.success('Send verify email successfully!');
    dispatch(push(routeName.resetPassword));
    return true;
  };

const resetPassword =
  (form: AuthForm): Function =>
  async (dispatch: Function): Promise<boolean> => {
    const errors = {};
    const user = plainToClass(ResetPasswordDto, form, {
      excludeExtraneousValues: true,
    });
    const validatedErrors = await validate(user);
    if (validatedErrors.length > 0) {
      validatedErrors.forEach((item) => {
        let message: string | undefined;
        for (const key in item.constraints) {
          if (item.constraints[key]) {
            message = utils.toUpperCaseFirstLetter(item.constraints[key]);
          }
        }
        errors[`authForm.${item.property}Error`] = message;
      });
    }
    if (
      !errors['authForm.confirmPasswordError'] &&
      form.confirmPassword !== form.password
    ) {
      errors['authForm.confirmPasswordError'] = 'Confirm password is incorrect';
    }

    if (!_.isEmpty(errors)) {
      dispatch(changeFields(errors));
      return false;
    }

    dispatch(
      changeFields({
        isFetching: true,
      }),
    );
    const response = await authApi.resetPassword(user);
    dispatch(
      changeFields({
        isFetching: false,
      }),
    );
    if (!response) {
      //todo network error
      notification.error('Please check your network');
      return false;
    }
    if (response.errors && response.errors.length > 0) {
      const errors: any = {};
      response.errors.forEach((item) => {
        if (item.domain == 'code') {
          errors[`authForm.codeError`] = 'Code is incorrect';
        } else {
          errors[`authForm.${item.domain}Error`] = item.message;
        }
      });
      dispatch(changeFields(errors));
      return false;
    }

    if (response.code !== 200) {
      notification.error('Something went wrong!');
      return false;
    }
    notification.success('Reset password successfully');
    dispatch(push(routeName.login));
    return true;
  };

const getSponsor =
  (username: string) =>
  async (dispatch): Promise<boolean> => {
    const response = await commonApi.getUserInfo(username);
    if (!response) {
      notification.error('Please check your network');
      return false;
    }

    dispatch(
      changeFields({
        'authForm.invitation_codeError': null,
        'authForm.isFetchingInvitationInfo': true,
        'authForm.invitationInfo': null,
      }),
    );
    if (response.code == 200 && response.data !== null) {
      dispatch(
        changeFields({
          'authForm.invitation_codeError': null,
          'authForm.isFetchingInvitationInfo': false,
          'authForm.invitationInfo': response.data,
          'authForm.invitation_code': response.data.username,
        }),
      );
    } else {
      dispatch(
        changeFields({
          'authForm.invitation_codeError': 'Sponsor not found',
          'authForm.isFetchingInvitationInfo': false,
          'authForm.invitationInfo': null,
        }),
      );
    }
    return true;
  };

const loginFromAdmin =
  (userId: string, adminAccessToken: string): Function =>
  async (dispatch: Function): Promise<boolean> => {
    dispatch(
      changeFields({
        isFetching: true,
      }),
    );
    Axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${adminAccessToken}`;
    const response = await authApi.loginFromAdmin(userId);
    dispatch(
      changeFields({
        isFetching: false,
      }),
    );
    if (!response) {
      //todo network error
      notification.error('Please check your network');
      return false;
    }

    if (response.code !== 200) {
      notification.error(response.message);
      return false;
    }

    if (response.data.status === UserStatus.Pending) {
      dispatch(
        changeFields({
          'authForm.email': response.data.email,
        }),
      );
      dispatch(push(routeName.verifyAccount));
    } else if (response.data.status === UserStatus.Blocked) {
      dispatch(
        changeFields({
          'authForm.passwordError': 'Your account have been blocked.',
        }),
      );
      return false;
    } else {
      Axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.access_token}`;
    }
    dispatch(
      userAction.changeFields({
        _id: response.data._id,
        info: response.data,
        access_token: response.data.access_token,
      }),
    );
    storage.saveUser(response.data, response.data.access_token);
    return true;
  };

const connect =
  (key: string) => async (dispatch, getState: () => RootState) => {
    try {
      if (!/([A-Za-z0-9]{32})/g.test(key)) {
        dispatch(
          changeFields({
            'connectForm.keyError': 'Invalid private key',
          }),
        );
      }
      dispatch(
        changeFields({
          isFetching: true,
        }),
      );
      sdk.changeKey(key);
      const ins = await sdk.ping();
      if (_.every(Object.values(ins))) {
        dispatch(
          changeFields({
            'connectForm.key': '',
            'connectForm.keyError': null,
            isFetching: false,
          }),
        );
        const walletAddress = sdk.ins.address.fromPrivateKey(key);
        const [account, resource] = await Promise.all([
          sdk.ins.dtc.getAccount(walletAddress),
          sdk.ins.dtc.getAccountResources(walletAddress),
        ]);
        const {
          balance = 0,
          allowance = 0,
          frozen = [],
          account_resource = {},
          assetV2 = [],
        } = account;
        // const drc10Token: TokenBase[] = JSON.parse(storage.loadAssets() || '[]');
        const drc20Token: Drc20Token[] = JSON.parse(
          storage.loadDrc20Token() || '[]',
        );
        await Promise.all(
          drc20Token.map((el) => {
            return async () => {
              const contract = await sdk.ins.contract().at(el.contractAddress);
              const balance = await contract.balanceOf(walletAddress).call();
              return { ...el, balance: balance.toString() };
            };
          }),
        );
        storage.saveDrc20Token(drc20Token);
        const { frozen_balance_for_energy = {} } = account_resource;
        let { frozen_balance = 0 } = frozen_balance_for_energy;
        const { freeNetUsed, freeNetLimit, NetUsed, NetLimit, EnergyLimit } =
          resource;
        frozen.forEach((el: any) => {
          frozen_balance += el.frozen_balance;
        });
        console.log(account, resource);
        dispatch(
          userAction.changeFields({
            connected: true,
            key,
            walletAddress,
            balance: parseFloat(sdk.ins.fromSun(balance)),
            bandwidth:
              (freeNetLimit || 0) + (NetLimit || 0) - (freeNetUsed || 0),
            bandwidthUsed: NetUsed || 0,
            energy: EnergyLimit || 0,
            energyUsed: 0, // fix later
            frozenBalance: parseFloat(sdk.ins.fromSun(frozen_balance)),
            reward: allowance,
            asset: assetV2,
            drc10Token: [],
            drc20Token,
          }),
        );
        //
        dispatch(push(getState().auth.returnUrl as any));
        storage.saveConnectKey(key);
        return true;
      } else {
        throw 'Bug';
      }
    } catch (error) {
      console.log('error :>> ', error);
      dispatch(
        changeFields({
          'connectForm.keyError': 'There is something wrong. Please try later',
          isFetching: false,
        }),
      );
      return false;
    }
  };

const disconnect =
  () =>
  (dispatch): void => {
    storage.saveConnectKey(null);
  };

export const authAction = {
  changeFields,
  login,
  sendVerifyEmail,
  logout,
  verifyAccount,
  sendForgotPasswordEmail,
  resetPassword,
  getSponsor,
  registerUser,
  loginFromAdmin,
  connect,
  disconnect,
};
