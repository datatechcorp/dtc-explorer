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
  send,
  freeze,
};
