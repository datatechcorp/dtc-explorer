import { Action, createAction, commonApi } from '../common';
import { MyTransactionDto } from './dto/my-transaction';
import { walletApi } from './wallet.api';
import { notification } from '../../utils/notification';
import {
  WithdrawDto,
  TransferDto,
  LendingDto,
  SwapDto,
  PayOrderWithoutProductDto,
  CreatePaymentCodeDto,
  SendDto,
  FreezeDto,
} from './dto';
import utils from '../../utils/utils';
import _ from 'lodash';
import { userAction } from '../user';
import { RootState } from '..';
import { commonAction } from '../common';
import { LendingForm, ResourceType, WalletState } from './wallet.interface';
import moment from 'moment';
import { push } from 'connected-react-router';
import { routeName } from '../../config/route-name';
import { TransactionType } from '../../models/transaction';
import { sdk } from '../../config/utils';
import { txApi } from '../transaction/tx.api';
import { Drc10Token, Drc20Token, txAction } from '../transaction';

export const Types = {
  changeFields: 'app.wallet.change-fields',
};

const changeFields = (object: any = {}): Action =>
  createAction(Types.changeFields, object);

const getMyTransactions =
  (query: MyTransactionDto = {}) =>
  async (dispatch): Promise<boolean> => {
    dispatch(
      changeFields({
        'transaction.isFetching': true,
        'transaction.data': [],
        'transaction.type': query.type,
        'transaction.status': query.status || null,
        'transaction.currency': query.currency || null,
      }),
    );
    const response = await walletApi.getMyTransactions(query);
    dispatch(
      changeFields({
        'transaction.isFetching': false,
      }),
    );
    if (!response) {
      notification.error('Please check your network');
      return false;
    }

    if (response.code !== 200) {
      notification.error('Something went wrong!');
      return false;
    }

    dispatch(
      changeFields({
        'transaction.data': response.data,
      }),
    );

    return true;
  };

const validateWithdraw =
  (data: any) =>
  async (dispatch): Promise<{ success: boolean; data: WithdrawDto | null }> => {
    const { errors, data: validatedData } = await commonAction.validate(
      data,
      WithdrawDto,
      `withdraw`,
    );

    if (!_.isEmpty(errors)) {
      dispatch(changeFields(errors));
      return { success: false, data: null };
    }

    return { success: true, data: validatedData };
  };

const withdraw =
  (data: any) =>
  async (dispatch, getState): Promise<boolean> => {
    const result = await validateWithdraw(data)(dispatch);
    if (!result.success || !result.data) {
      return false;
    }

    dispatch(
      changeFields({
        'withdraw.isFetching': true,
      }),
    );
    const response = await walletApi.withdraw(result.data);
    dispatch(
      changeFields({
        'withdraw.isFetching': false,
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

    notification.success('Withdraw successfully.');
    const state: RootState = getState();

    dispatch(
      changeFields({
        'withdraw.amount': '0',
        'withdraw.address': '',
      }),
    );
    if (state.wallet.transaction.type === TransactionType.WithdrawCoin) {
      dispatch(
        changeFields({
          'transaction.data': [response.data, ...state.wallet.transaction.data],
        }),
      );
    }

    return true;
  };

const findUser =
  (key: string) =>
  (dispatch): void => {
    dispatch(
      changeFields({
        'transfer.isFetching': true,
        'transfer.receivedUser': null,
        'transfer.canTransfer': false,
      }),
    );
    commonApi.getUserInfo(key).then((response) => {
      const updated = {
        'transfer.isFetching': false,
      };
      if (response && response.code == 200) {
        updated['transfer.receivedUser'] = response.data;
        updated['transfer.canTransfer'] = (response as any).can_transfer;
      }
      dispatch(changeFields(updated));
    });
  };

const validateTransfer =
  (data: any) =>
  async (
    dispatch,
    getState,
  ): Promise<{ success: boolean; data: any | null }> => {
    const { errors, data: validatedData } = await commonAction.validate(
      data,
      TransferDto,
      `transfer`,
    );

    if (!_.isEmpty(errors)) {
      dispatch(changeFields(errors));
      return { success: false, data: null };
    }

    return { success: true, data: validatedData };
  };

const transfer =
  (data: any) =>
  async (dispatch, getState): Promise<boolean> => {
    const { errors, data: validatedData } = await commonAction.validate(
      data,
      TransferDto,
      'transfer',
    );

    if (!_.isEmpty(errors)) {
      dispatch(changeFields(errors));
      return false;
    }

    dispatch(
      changeFields({
        'transfer.isFetching': true,
      }),
    );
    const response = await walletApi.transfer(validatedData);
    dispatch(
      changeFields({
        'transfer.isFetching': false,
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

    notification.success('Transfer successfully.');
    const state: RootState = getState();
    dispatch(
      changeFields({
        'transfer.amount': 0,
        'transfer.username_or_email': '',
        'transfer.receivedUser': null,
      }),
    );
    if (!state.wallet.transaction.type) {
      dispatch(
        changeFields({
          'transaction.data': [response.data, ...state.wallet.transaction.data],
        }),
      );
    }

    return true;
  };

const getMyStatistics =
  () =>
  async (dispatch): Promise<boolean> => {
    dispatch(
      changeFields({
        'transaction.isFetching': true,
      }),
    );
    const response = await walletApi.getMyStatistics();
    dispatch(
      changeFields({
        'transaction.isFetching': false,
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

    dispatch(
      changeFields({
        'transaction.statistic': response.data,
      }),
    );

    return true;
  };

const validateLending =
  (data: LendingForm) =>
  async (
    dispatch,
    getState,
  ): Promise<{ success: boolean; data: LendingDto | null }> => {
    const body = {
      amount_usd: data.amount_usd,
      wallet_id: data.wallet?._id,
    };

    const { errors, data: validatedData } = await commonAction.validate(
      body,
      LendingDto,
      'lending.form',
    );

    if (_.isEmpty(errors)) {
      const price = 1;
      const walletAmount = validatedData.amount / price;
      if (validatedData.wallet?.available_amount < walletAmount) {
        errors['lending.form.amountError'] =
          'Not enough ' +
          utils.getDisplayNameForCurrency(validatedData.currency);
      }
    }

    if (!_.isEmpty(errors)) {
      dispatch(changeFields(errors));
      return { success: false, data: null };
    }

    return { success: true, data: validatedData };
  };

const lending =
  (data: LendingForm) =>
  async (dispatch, getState): Promise<boolean> => {
    const body = {
      amount_usd: data.amount_usd,
      wallet_id: data.wallet?._id,
    };
    const { errors, data: validatedData } = await commonAction.validate(
      body,
      LendingDto,
      'lending.form',
    );

    if (!_.isEmpty(errors)) {
      dispatch(changeFields(errors));
      return false;
    }

    dispatch(
      changeFields({
        'lending.isFetching': true,
      }),
    );
    const response = await walletApi.lending(validatedData);
    dispatch(
      changeFields({
        'lending.isFetching': false,
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

    notification.success('Successfully.');

    const state: RootState = getState();
    dispatch(
      changeFields({
        'lending.form.amount': 0,
        'lending.form.amountError': null,
        'lending.data': [response.data, ...state.wallet.lending.data],
      }),
    );

    return true;
  };

const getLendingPackage =
  () =>
  async (dispatch, getState): Promise<boolean> => {
    dispatch(
      changeFields({
        'lending.isFetching': true,
      }),
    );
    const response = await walletApi.getLendingPackage();
    dispatch(
      changeFields({
        'lending.isFetching': false,
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

    dispatch(
      changeFields({
        'lending.data': response.data,
      }),
    );

    return true;
  };

const getMyWallets =
  () =>
  async (dispatch): Promise<boolean> => {
    dispatch(
      changeFields({
        isFetching: true,
      }),
    );
    const response = await walletApi.getMyWallets();
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
    const wallets: any = {};
    response.data.forEach((wallet) => {
      const id = wallet.coin as string;
      wallets[id] = wallet;
    });
    dispatch(
      changeFields({
        walletByCoin: wallets,
        isGotWallet: true,
      }),
    );

    return true;
  };

const getAllCoins =
  () =>
  async (dispatch): Promise<boolean> => {
    dispatch(
      changeFields({
        isFetching: true,
      }),
    );
    const response = await walletApi.getAllCoins();
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

    const coinById = {};
    response.data.forEach((coin) => {
      coinById[coin._id] = coin;
    });
    dispatch(
      changeFields({
        coinById,
        isGotCoin: true,
      }),
    );

    return true;
  };

const getWalletForCoin =
  (coinId: string) =>
  async (dispatch, getState): Promise<boolean> => {
    dispatch(
      changeFields({
        isFetching: true,
      }),
    );
    const response = await walletApi.getWalletForCoin(coinId);
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
    const walletState = getState().wallet as WalletState;
    const wallets: any = {
      ...walletState.walletByCoin,
      [response.data.wallet.coin as string]: response.data.wallet,
    };

    dispatch(
      changeFields({
        walletByCoin: wallets,
      }),
    );

    return true;
  };

const swap =
  (data: any) =>
  async (dispatch, getState): Promise<boolean> => {
    const { errors, data: validatedData } = await commonAction.validate(
      data,
      SwapDto,
      'swap',
    );

    if (!_.isEmpty(errors)) {
      dispatch(changeFields(errors));
      return false;
    }

    dispatch(
      changeFields({
        'swap.isFetching': true,
      }),
    );
    const response = await walletApi.swap(validatedData);
    dispatch(
      changeFields({
        'swap.isFetching': false,
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

    notification.success('Swap successfully.');
    const state: RootState = getState();
    dispatch(
      userAction.changeFields({
        info: response.data.user,
      }),
    );
    dispatch(
      changeFields({
        'swap.amount': 0,
        'swap.amountError': null,
      }),
    );
    dispatch(
      changeFields({
        'transaction.data': [
          ...response.data.transactions,
          ...state.wallet.transaction.data,
        ],
      }),
    );

    return true;
  };

const validateSwap =
  (data: any) =>
  async (
    dispatch,
    getState,
  ): Promise<{ success: boolean; data: SwapDto | null }> => {
    const { errors, data: validatedData } = await commonAction.validate(
      data,
      SwapDto,
      `swap`,
    );

    const state = getState();
    if (state.user.info.wallet.APOINT.amount < validatedData.amount) {
      errors['swap.amountError'] = 'Not enough USDA';
    }

    if (!_.isEmpty(errors)) {
      dispatch(changeFields(errors));
      return { success: false, data: null };
    }

    return { success: true, data: validatedData };
  };

const getChildrenStatistic =
  (date: Date) =>
  async (dispatch, getState): Promise<boolean> => {
    const from = moment(date).startOf('month').toDate();
    const to = moment(date).endOf('month').toDate();
    dispatch(
      changeFields({
        'childrenStatistic.isFetching': true,
        'childrenStatistic.from': from,
        'childrenStatistic.to': to,
        'childrenStatistic.totalLendingUsdt': 0,
        'childrenStatistic.totalSwapAmas': 0,
        'childrenStatistic.totalApoint': 0,
      }),
    );
    const response = await walletApi.getChildrenStatistic({ from, to });
    dispatch(
      changeFields({
        'childrenStatistic.isFetching': false,
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

    dispatch(
      changeFields({
        'childrenStatistic.totalLendingUsdt': response.data.totalLendingUsdt,
        'childrenStatistic.totalSwapAmas': response.data.totalSwapAmas,
        'childrenStatistic.totalApoint': response.data.totalApoint,
      }),
    );

    return true;
  };

const validatePayOrderWithoutProduct =
  (data: any) =>
  async (
    dispatch,
    getState,
  ): Promise<{ success: boolean; data: any | null }> => {
    const { errors, data: validatedData } = await commonAction.validate(
      data,
      PayOrderWithoutProductDto,
      `transfer`,
    );

    const state = getState();
    if (
      state.user.info.wallet[validatedData.type].amount < validatedData.amount
    ) {
      errors['transfer.amountError'] = 'Not enough money';
    }

    if (!_.isEmpty(errors)) {
      dispatch(changeFields(errors));
      return { success: false, data: null };
    }

    return { success: true, data: validatedData };
  };

const payOrderWithoutProduct =
  (data: any) =>
  async (dispatch, getState): Promise<boolean> => {
    const { errors, data: validatedData } = await commonAction.validate(
      data,
      PayOrderWithoutProductDto,
      'transfer',
    );

    if (!_.isEmpty(errors)) {
      dispatch(changeFields(errors));
      return false;
    }

    dispatch(
      changeFields({
        'transfer.isFetching': true,
      }),
    );
    const response = await walletApi.payOrderWithoutProduct(validatedData);
    dispatch(
      changeFields({
        'transfer.isFetching': false,
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

    notification.success('Transfer successfully.');
    const state: RootState = getState();
    dispatch(
      userAction.changeFields({
        info: response.data.user,
      }),
    );
    dispatch(
      changeFields({
        'transfer.amount': 0,
        'transfer.username_or_email': '',
        'transfer.receivedUser': null,
      }),
    );
    if (!state.wallet.transaction.type) {
      dispatch(
        push(routeName.orderDetail + '?code=' + response.data.order.code),
      );
    }

    return true;
  };

const createPaymentCode =
  (data: CreatePaymentCodeDto) =>
  async (dispatch, getState): Promise<boolean> => {
    dispatch(
      changeFields({
        'paymentCode.isFetching': true,
      }),
    );
    const response = await walletApi.createPaymentCode(data);
    dispatch(
      changeFields({
        'paymentCode.isFetching': false,
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

    dispatch(
      changeFields({
        'paymentCode.info': response.data,
      }),
    );

    return true;
  };

const send = () => async (dispatch, getState: () => RootState) => {
  const { walletAddress, balance, asset, key, drc10Token, drc20Token } =
    getState().user;
  let done = false;
  const { amount, token, receiver } = getState().wallet;
  try {
    const { errors } = await commonAction.validate(
      { amount, receiver },
      SendDto,
    );
    if (receiver === walletAddress) {
      errors['receiverError'] = 'Cannot send to same address';
    }
    if (amount > balance) {
      errors['amountError'] = 'Insufficient balance';
    }
    if (!receiver.startsWith('D')) {
      errors['receiverError'] = 'Invalid address';
    }
    if (!_.isEmpty(errors)) {
      dispatch(changeFields(errors));
      return false;
    }
    dispatch(changeFields({ isFetching: true }));
    let receipt;
    switch (token) {
      case 'dtc': {
        receipt = await sdk.ins.dtc.sendTransaction(
          receiver,
          sdk.ins.toSun(amount),
        );
        break;
      }
      default: {
        const target = (
          [...drc10Token, ...drc20Token] as (Drc10Token | Drc20Token)[]
        ).find((el) => el.name === token);

        if (target) {
          const contractAddress = (target as Drc20Token).contractAddress;
          if (contractAddress) {
            const contract = await sdk.ins.contract().at(contractAddress);
            const res = await contract.transfer(receiver, amount).send({
              feeLimit: 1e8,
              callValue: 0,
              shouldPollResponse: true,
            });
            if (res) {
              receipt = {
                result: true,
              };
            }
          } else {
            receipt = await sdk.ins.dtc.sendToken(
              receiver,
              amount,
              (target as Drc10Token).id,
            );
          }
        }
        break;
      }
    }
    console.log('receipt :>> ', receipt);
    if (receipt && receipt.result) {
      if (receipt.transaction) {
        const timeout = setTimeout(async () => {
          const res = await txApi.getTx(receipt.transaction.txID);
          if (res && res.transaction) {
            dispatch(txAction.insertTx(res.transaction));
            dispatch(userAction.getInfoFromConnectKey(key));
          }
          clearTimeout(timeout);
        }, 4000);
      } else {
        dispatch(userAction.getInfoFromConnectKey(key));
      }

      notification.success('Send successfully');
      done = true;
      return true;
    }
  } catch (error) {
    console.log(error);
    notification.success('Fail to send. Please try later');
    done = true;
    return false;
  } finally {
    if (done) {
      dispatch(
        changeFields({
          isFetching: false,
          showSendModal: false,
          amount: 0,
          receiver: '',
          amountError: null,
          receiverError: null,
        }),
      );
    }
  }
};

const freeze = () => async (dispatch, getState: () => RootState) => {
  const { walletAddress, balance, key } = getState().user;
  let done = false;
  try {
    const { amountToFreeze, resourceType, duration } = getState().wallet;
    const { errors } = await commonAction.validate(
      { amountToFreeze },
      FreezeDto,
    );
    if (amountToFreeze > balance) {
      errors['amountToFreezeError'] = 'Insufficient balance';
    }
    console.log('errors :>> ', errors);
    if (!_.isEmpty(errors)) {
      dispatch(changeFields(errors));
      return false;
    }
    dispatch(changeFields({ isFetching: true }));
    const unsignedTx = await sdk.ins.transactionBuilder.freezeBalance(
      sdk.ins.toSun(amountToFreeze),
      duration,
      resourceType,
      walletAddress,
      walletAddress,
    );
    const signedTx = await sdk.ins.dtc.sign(unsignedTx, key);
    const receipt = await sdk.ins.dtc.sendRawTransaction(signedTx);
    console.log('receipt :>> ', receipt);
    if (receipt && receipt.result) {
      setTimeout(async () => {
        const res = await txApi.getTx(receipt.transaction.txID);
        if (res && res.transaction) {
          dispatch(
            txAction.insertTx({
              ...res.transaction,
              assetAmount: sdk.ins.toSun(amountToFreeze),
            }),
          );
        }
      }, 4000);
      notification.success('Freeze successfully');
      done = true;
      return true;
    }
  } catch (error) {
    console.log('freeze error :>> ', error);
    notification.success('Fail to freeze. Please try later');
    done = true;
    return false;
  } finally {
    if (done) {
      dispatch(
        changeFields({
          isFetching: false,
          showObtainModal: false,
          amountToFreeze: 0,
          amountToFreezeError: null,
          resourceType: 'BANDWIDTH',
          confirm: false,
          duration: 3,
        }),
      );
      dispatch(userAction.getInfoFromConnectKey(key));
    }
  }
};

export const walletAction = {
  changeFields,
  getMyTransactions,
  withdraw,
  validateWithdraw,
  findUser,
  transfer,
  getMyStatistics,
  validateLending,
  lending,
  getLendingPackage,
  getMyWallets,
  getAllCoins,
  swap,
  validateSwap,
  validateTransfer,
  getChildrenStatistic,
  validatePayOrderWithoutProduct,
  payOrderWithoutProduct,
  createPaymentCode,
  getWalletForCoin,
  //
  send,
  freeze,
};
