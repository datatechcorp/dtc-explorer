import _ from 'lodash';
import { Action, createAction, commonAction } from '../common';
import { userApi } from './user.api';
import {
  UserForm,
  AddressForm,
  DevicePlatform,
  DeviceStatus,
  Asset,
} from './user.interface';
import {
  ChangeUserInfoDto,
  ChangePasswordDto,
  AddressDto,
  ChangeTwoFaStatusDto,
  UpdateKycDto,
  UpdateEnterpriseDto,
} from './dto';
import { notification } from '../../utils/notification';
import { RootState } from '..';
import { storage } from '../../utils/storage';
import { sdk } from '../../config/utils';
import { setting } from '../../config/setting';
import { Drc20Token, TokenBase } from '../transaction';

export const Types = {
  changeFields: 'app.user.change-fields',
  setInfo: 'user.set-user',
};

const changeFields = (object: any = {}): Action =>
  createAction(Types.changeFields, object);

const setInfo = (data: any = {}): Action => createAction(Types.setInfo, data);

const getMyInfo =
  () =>
  (dispatch, getState): void => {
    userApi.getMyInfo().then((response) => {
      if (!response) {
        return;
      }

      if (response.code === 200) {
        storage.saveUser(response.data, getState().user.access_token);
        dispatch(
          changeFields({
            _id: response.data._id,
            info: response.data,
          }),
        );
      } else if (response.code === 401) {
        storage.saveUser(null, null);
      }
    });
  };

const getInfoFromConnectKey = (key: string) => async (dispatch) => {
  try {
    dispatch(
      changeFields({
        connected: true,
        key,
      }),
    );
    sdk.changeKey(key);
    const obj = await sdk.ping();
    const walletAddress = sdk.ins.address.fromPrivateKey(key);
    if (_.every(Object.values(obj))) {
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
        drc20Token.map((el, i) => {
          console.log('check', el.contractAddress);
          const getBalance = async () => {
            const contract = await sdk.ins.contract().at(el.contractAddress);
            const balance = await contract.balanceOf(walletAddress).call();
            console.log('balance :>> ', balance, balance.toString());
            drc20Token[i].balance = balance.toString();
          };
          return getBalance();
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
        changeFields({
          walletAddress,
          balance: parseFloat(sdk.ins.fromSun(balance)),
          bandwidth: (freeNetLimit || 0) + (NetLimit || 0) - (freeNetUsed || 0),
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
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const updateUserInfo =
  (form: UserForm) =>
  async (dispatch): Promise<boolean> => {
    const { errors, data } = await commonAction.validate(
      form,
      ChangeUserInfoDto,
      'form',
    );

    if (!_.isEmpty(errors)) {
      dispatch(changeFields(errors));
      return false;
    }

    dispatch(
      changeFields({
        isFetching: true,
      }),
    );
    const response = await userApi.updateUserInfo(data);
    dispatch(
      changeFields({
        isFetching: false,
      }),
    );
    if (!response) {
      notification.error('Please check your network');
      return false;
    }

    if (response.code !== 200) {
      notification.error(response.message);
      return false;
    }
    notification.success('Update user info successfully');
    dispatch(setInfo(response.data));
    return true;
  };

const changePassword =
  (form: UserForm) =>
  async (dispatch): Promise<boolean> => {
    const { errors, data } = await commonAction.validate(
      form,
      ChangePasswordDto,
      'form',
    );

    if (form.new_password !== form.confirm_password) {
      errors['form.confirm_passwordError'] = 'Confirm password is incorrect';
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
    const response = await userApi.changePassword(data);
    dispatch(
      changeFields({
        isFetching: false,
      }),
    );
    if (!response) {
      notification.error('Please check your network');
      return false;
    }

    if (response.code !== 200) {
      dispatch(
        changeFields({
          'form.passwordError': 'Old password is incorrect',
        }),
      );
      return false;
    }
    notification.success('Change password successfully');
    dispatch(
      changeFields({
        'form.password': '',
        'form.new_password': '',
        'form.confirm_password': '',
      }),
    );
    return true;
  };

const getMyAddresses =
  () =>
  async (dispatch): Promise<boolean> => {
    const response = await userApi.getMyAddresses();
    if (!response) {
      return false;
    }

    if (response.code === 200) {
      dispatch(
        changeFields({
          'address.data': response.data,
        }),
      );
    }
    return true;
  };

const updateAddress =
  (form: AddressForm) =>
  async (dispatch): Promise<boolean> => {
    const { errors, data } = await commonAction.validate(
      form,
      AddressDto,
      'address.form',
    );

    if (!_.isEmpty(errors)) {
      dispatch(changeFields(errors));
      return false;
    }

    dispatch(
      changeFields({
        isFetching: true,
      }),
    );
    const response = await userApi.updateAddress(data);
    dispatch(
      changeFields({
        isFetching: false,
      }),
    );
    if (!response) {
      notification.error('Please check your network');
      return false;
    }

    if (response.code !== 200) {
      notification.error(response.message);
      return false;
    }
    notification.success('Update address successfully');
    return true;
  };

const getMyChildren =
  () =>
  async (dispatch, getState): Promise<boolean> => {
    const state: RootState = getState();
    if (state.user.myChildren.isGot) {
      return true;
    }
    const response = await userApi.getMyChildren();
    if (!response) {
      return false;
    }

    if (response.code === 200) {
      dispatch(
        changeFields({
          'myChildren.data': response.data,
          'myChildren.isGot': true,
        }),
      );
    }
    return true;
  };

const getTwoFaUri =
  () =>
  async (dispatch, getState): Promise<boolean> => {
    const state: RootState = getState();
    if (state.user.two_fa.two_fa_uri) {
      return true;
    }
    dispatch(
      changeFields({
        'two_fa.isFetching': true,
      }),
    );
    const response = await userApi.getTwoFaUri();
    if (!response || response.code !== 200) {
      dispatch(
        changeFields({
          'two_fa.isFetching': false,
        }),
      );
      return false;
    }

    if (response.code === 200) {
      dispatch(
        changeFields({
          'two_fa.two_fa_uri': response.data,
          'two_fa.isFetching': false,
          'two_fa.token': '',
          'two_fa.tokenError': null,
        }),
      );
    }
    return true;
  };

const changeTwoFa =
  (data: ChangeTwoFaStatusDto) =>
  async (dispatch, getState): Promise<boolean> => {
    const { errors, data: validatedData } = await commonAction.validate(
      data,
      ChangeTwoFaStatusDto,
      'two_fa',
    );
    if (!_.isEmpty(errors)) {
      dispatch(changeFields(errors));
      return false;
    }
    dispatch(
      changeFields({
        'two_fa.isFetching': true,
      }),
    );
    const response = await userApi.setupTwoFa(validatedData);

    if (!response || response.code !== 200) {
      dispatch(
        changeFields({
          'two_fa.isFetching': false,
          'two_fa.tokenError': 'Token is invalid',
        }),
      );
      return false;
    }

    if (response.code === 200) {
      dispatch(
        changeFields({
          'two_fa.isFetching': false,
          'info.enable_two_fa': data.active,
          'two_fa.token': '',
          'two_fa.tokenError': null,
        }),
      );
    }
    return true;
  };

const updateKyc =
  (form: UserForm) =>
  async (dispatch): Promise<boolean> => {
    const { errors, data } = await commonAction.validate(
      form,
      UpdateKycDto,
      'form',
    );

    if (!_.isEmpty(errors)) {
      dispatch(changeFields(errors));
      return false;
    }

    dispatch(
      changeFields({
        isFetching: true,
      }),
    );
    const response = await userApi.updateKyc(data);
    dispatch(
      changeFields({
        isFetching: false,
      }),
    );
    if (!response) {
      notification.error('Please check your network');
      return false;
    }

    if (response.code !== 200) {
      notification.error(response.message);
      return false;
    }
    notification.success('Update KYC successfully');
    dispatch(setInfo(response.data));
    return true;
  };

const updateEnterprise =
  (form: UserForm) =>
  async (dispatch): Promise<boolean> => {
    const { errors, data } = await commonAction.validate(
      form,
      UpdateEnterpriseDto,
      'form',
    );

    if (!_.isEmpty(errors)) {
      dispatch(changeFields(errors));
      return false;
    }

    dispatch(
      changeFields({
        isFetching: true,
      }),
    );
    const response = await userApi.updateEnterprise(data);
    dispatch(
      changeFields({
        isFetching: false,
      }),
    );
    if (!response) {
      notification.error('Please check your network');
      return false;
    }

    if (response.code !== 200) {
      notification.error(response.message);
      return false;
    }
    notification.success('Update Enterprise Info successfully');
    dispatch(setInfo(response.data));
    return true;
  };

const addOrUpdateDevice =
  (token: string, status: DeviceStatus) =>
  async (dispatch): Promise<boolean> => {
    const response = await userApi.addOrUpdateDevice({
      token,
      platform: DevicePlatform.web,
      status,
    });
    return true;
  };

export const userAction = {
  changeFields,
  setInfo,
  getMyInfo,
  updateUserInfo,
  changePassword,
  getMyAddresses,
  updateAddress,
  getMyChildren,
  getTwoFaUri,
  changeTwoFa,
  updateKyc,
  updateEnterprise,
  addOrUpdateDevice,
  getInfoFromConnectKey,
};
