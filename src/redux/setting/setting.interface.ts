import { Banner } from '../../models/banner';
import { Country } from '../../models/country';
import { WithdrawTargetType } from '../../models/withdraw-types';

export interface PriceState {
  BTC: number;
  ETH: number;
  AMAS: number;
  APOINT: number;
}

export interface WithdrawFee {
  BTC: number;
  ETH: number;
  VISA: number;
  [WithdrawTargetType.AMAS_AMAS]: number;
  [WithdrawTargetType.TradeUSDT_USDT]: number;
}

export interface CustomerBannerState {
  topOfHome: Banner | null;
  bottomOfHome: Banner | null;
  leftOfHome: Banner | null;
  rightOfHome: Banner | null;
  homeSlider: Banner[];
  home1: Banner | null;
  home2: Banner | null;
  home3: Banner | null;
  home4: Banner | null;
  home5: Banner | null;
  belowCategoryOfProduct: Banner | null;
}

export interface ConfigState {
  withdrawFeePercent: WithdrawFee;
  transferFeePercent: {
    APOINT: number;
    USD: number;
    AMAS: number;
  };
  allowTransfer: {
    APOINT: boolean;
    USD: boolean;
    AMAS: boolean;
  };
  swapFeePercent: number;

  autoCancelUnpaidOrderAfter: number;
  allowPayOrderPeriod: number;
  customerBanner: CustomerBannerState;
  requiredKycBeforeWithdrawing: boolean;
  allowTransferToEnterprise: {
    APOINT: boolean;
    USD: boolean;
    AMAS: boolean;
  };
  transferToEnterpriseFeePercent: {
    APOINT: number;
    USD: number;
    AMAS: number;
  };
  allowSwap: boolean;
  allowWithdraw: {
    [WithdrawTargetType.AMAS_AMAS]: boolean;
    [WithdrawTargetType.TradeUSDT_USDT]: boolean;
  };
  minWithdraw: {
    [WithdrawTargetType.AMAS_AMAS]: number;
    [WithdrawTargetType.TradeUSDT_USDT]: number;
  };
  allowLending: {
    USD: boolean;
    AMAS: boolean;
  };
  allowPaymentType: {
    USD: boolean;
    AMAS: boolean;
  };

  countryCurrencyPrice: any;
  notification: {
    isShow: boolean;
    html: string | null;
    version: number;
  };
  tradeFeePercent: {
    sell: number;
    buy: number;
    fill: number;
  };
}

export interface SettingState {
  config: ConfigState;
  price: PriceState;
  showSidebar: boolean;
  country: Country | null;
  language: string;
}
