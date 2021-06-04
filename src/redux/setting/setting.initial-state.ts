import { WithdrawTargetType } from '../../models/withdraw-types';
import { SettingState } from './setting.interface';

export const settingInitialState: SettingState = {
  config: {
    withdrawFeePercent: {
      BTC: 0,
      ETH: 0,
      VISA: 0,
      [WithdrawTargetType.AMAS_AMAS]: 0,
      [WithdrawTargetType.TradeUSDT_USDT]: 0,
    },
    transferFeePercent: {
      APOINT: 0,
      USD: 0,
      AMAS: 0,
    },
    swapFeePercent: 0,
    autoCancelUnpaidOrderAfter: 1 * 3600,
    allowPayOrderPeriod: 900,
    customerBanner: {
      topOfHome: null,
      bottomOfHome: null,
      leftOfHome: null,
      rightOfHome: null,
      homeSlider: [],
      home1: null,
      home2: null,
      home3: null,
      home4: null,
      home5: null,
      belowCategoryOfProduct: null,
    },
    allowSwap: true,
    allowTransfer: {
      APOINT: true,
      USD: true,
      AMAS: true,
    },
    allowTransferToEnterprise: {
      APOINT: true,
      USD: true,
      AMAS: true,
    },
    transferToEnterpriseFeePercent: {
      APOINT: 0,
      USD: 0,
      AMAS: 0,
    },
    allowWithdraw: {
      [WithdrawTargetType.AMAS_AMAS]: true,
      [WithdrawTargetType.TradeUSDT_USDT]: true,
    },
    minWithdraw: {
      [WithdrawTargetType.TradeUSDT_USDT]: 50,
      [WithdrawTargetType.AMAS_AMAS]: 50,
    },
    requiredKycBeforeWithdrawing: true,
    allowLending: {
      AMAS: true,
      USD: true,
    },
    allowPaymentType: {
      AMAS: true,
      USD: true,
    },
    countryCurrencyPrice: {},
    notification: {
      isShow: false,
      html: null,
      version: 0,
    },
    tradeFeePercent: {
      sell: 0,
      buy: 0,
      fill: 0,
    },
  },
  price: {
    BTC: 1,
    ETH: 1,
    AMAS: 1,
    APOINT: 1,
  },
  showSidebar: false,
  country: null,
  language: 'en',
};
