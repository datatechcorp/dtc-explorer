import { txApi } from './tx.api';
import { Action, createAction } from '../common';
import { notification } from '../../utils/notification';
import { GetTxsDto } from './dto';
import { RootState } from '..';
import { storage } from '../../utils/storage';
import { RecordContrRequest, TokenBase, Tx, RecordContr } from './tx.interface';
import {
  removeSpace,
  sdk,
  errorStack,
  isErrResponse,
} from '../../config/utils';
import { userAction } from '../user';
import abi from '../../static/solc_0.5.15_token_abi.json';
import bytecode from '../../static/solc_0.5.15_token_bytecode.json';

export const Types = {
  changeFields: 'app.tx.change-fields',
};

const changeFields = (object: any = {}): Action =>
  createAction(Types.changeFields, object);

const getTxs =
  (query: Partial<GetTxsDto>, prefix: string) =>
  async (dispatch): Promise<boolean> => {
    dispatch(
      changeFields({
        [`${prefix}.fetching`]: true,
      }),
    );
    const response = await txApi.getTxs(query);
    dispatch(
      changeFields({
        [`${prefix}.fetching`]: false,
      }),
    );
    if (!response) {
      notification.error('Please check your network');
      return false;
    }
    dispatch(
      changeFields({
        [`${prefix}.data`]: response.data,
      }),
    );
    return true;
  };

const getMyTxs = () => (dispatch) => {
  dispatch(changeFields({ fetching: true }));
  const txs = storage.loadTxs();
  if (txs) {
    dispatch(changeFields({ mine: JSON.parse(txs), fetching: false }));
    return true;
  } else {
    dispatch(changeFields({ fetching: false }));
    return false;
  }
};

const insertTx = (tx: Tx) => (dispatch, getState: () => RootState) => {
  const { mine } = getState().transaction;
  const newTxs = [tx, ...mine];
  dispatch(changeFields({ mine: newTxs }));
  storage.saveTxs(newTxs);
};

const issueToken = () => async (dispatch, getState: () => RootState) => {
  try {
    dispatch(changeFields({ fetching: true }));
    const {
      transaction: {
        issueTokenForm: {
          name,
          symbol,
          decimals,
          totalSupply,
          tokenType,
          description,
          url,
          ratio,
        },
      },
      user: { key, walletAddress: address, drc10Token, drc20Token },
    } = getState();
    let receipt;
    switch (tokenType) {
      case 'DRC10': {
        const entry = new Date();
        const saleStart = new Date(Number(entry));
        saleStart.setHours(saleStart.getHours() + 1);
        const saleEnd = new Date(Number(saleStart));
        saleEnd.setDate(saleStart.getDate() + 30);
        const options = {
          name: removeSpace(name),
          abbreviation: symbol,
          description: description || 'no description',
          url,
          totalSupply,
          dtcRatio: 1,
          tokenRatio: ratio,
          saleStart: Number(saleStart),
          saleEnd: Number(saleEnd),
          freeBandwidth: 0,
          freeBandwidthLimit: 0,
          frozenAmount: 0,
          frozenDuration: 0,
          precision: 6,
        };
        const tx = await sdk.ins.transactionBuilder.createToken(
          options,
          address,
        );
        const signedTx = await sdk.ins.dtc.sign(tx, key);
        receipt = await sdk.ins.dtc.sendRawTransaction(signedTx);
        break;
      }
      case 'DRC20': {
        const contract = await sdk.ins.contract().new({
          abi,
          bytecode,
          feeLimit: 1e9,
          callValue: 0,
          userFeePercentage: 1,
          originEnergyLimit: 1e7,
          parameters: [
            sdk.ins.toHex(totalSupply),
            sdk.ins.toHex(name),
            sdk.ins.toHex(symbol),
            sdk.ins.toHex(decimals),
          ],
        });
        receipt = contract.address;
        break;
      }
      default:
        break;
    }
    console.log('receipt :>> ', receipt);
    //
    dispatch(changeFields({ fetching: false }));
    if (receipt) {
      // if ((response as any).message) {
      //   notification.error((response as any).message);
      //   return false;
      // }
      // refresh wallet, transaction
      const baseInfo: TokenBase = {
        name: removeSpace(name),
        symbol,
        decimals,
        totalSupply,
      };
      switch (tokenType) {
        case 'DRC10':
          // storage.saveAssets([...drc10Token, baseInfo]);
          break;
        case 'DRC20':
          storage.saveDrc20Token([
            ...drc20Token,
            { ...baseInfo, contractAddress: receipt, balance: totalSupply },
          ]);
          break;
        default:
          break;
      }
      const timeout = setTimeout(() => {
        dispatch(userAction.getInfoFromConnectKey(key));
        clearTimeout(timeout);
      }, 3000);
      notification.success('Create Token successfully');
    } else {
      notification.error('Please check your network');
      return false;
    }
  } catch (error) {
    if (
      error ===
      'class org.tron.core.exception.ContractValidateException : An account can only issue one asset'
    ) {
      notification.error('An account can only issue one asset');
    }
  }
};

const recordToken = () => async (dispatch, getState: () => RootState) => {
  const {
    transaction: {
      recordContrForm: {
        contrType,
        contrAddress,
        tknDescriptions,
        tknLogo,
        oflWebsite,
        email,
        github,
        whitepaper,
        links,
        signature,
      },
    },
  } = getState();
  const { pushError, hasErrors } = errorStack(
    'recordContrForm',
    dispatch,
    changeFields,
  );
  if (!sdk.ins.isAddress(contrAddress)) {
    pushError('contrAddress', 'Invalid contract address');
  }
  if (!tknDescriptions) {
    pushError('tknDescriptions', 'Required field');
  }
  if (!tknLogo) {
    pushError('tknLogo', 'Required field');
  }
  if (!oflWebsite) {
    pushError('oflWebsite', 'Required field');
  }
  if (!email) {
    pushError('email', 'Required field');
  }
  if (hasErrors()) {
    return false;
  }
  dispatch(changeFields({ fetching: true }));

  const params: RecordContrRequest = {
    contrType,
    contrAddress,
    tknDescriptions,
    tknLogo,
    oflWebsite,
    email,
    signature,
  };
  if (github) {
    params.github = github;
  }
  if (whitepaper) {
    params.whitepaper = whitepaper;
  }
  if (links.platforms.length > 0) {
    params.links = links;
  }
  const response = await txApi.recordContr(params);

  dispatch(changeFields({ fetching: false }));

  if (response) {
    if (isErrResponse(response)) {
      notification.error(response.message);
      return false;
    } else {
      dispatch(changeFields({ isDone: true }));
      return true;
    }
  }
  notification.error('Please check your network');
  return false;
};

export const txAction = {
  changeFields,
  getTxs,
  getMyTxs,
  insertTx,
  issueToken,
  recordToken,
};
