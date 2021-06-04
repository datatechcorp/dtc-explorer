import {
  WithdrawFee,
  PriceState,
  CustomerBannerState,
} from '../setting.interface';

export interface ConfigDto {
  withdrawFeePercent: WithdrawFee;
  transferFeePercent: {
    APOINT: number;
    USD: number;
    AMAS: number;
  };
  swapFeePercent: number;
  allowTransfer: {
    APOINT: boolean;
    USD: boolean;
    AMAS: boolean;
  };
  allowLending: {
    USD: boolean;
    AMAS: boolean;
  };
  allowSwap: boolean;
  allowWithdraw: {
    AMAS: boolean;
  };
  minWithdraw: {
    AMAS: number;
  };
  requiredKycBeforeWithdrawing: boolean;
  price: PriceState;
  autoCancelUnpaidOrderAfter: number;
  allowPayOrderPeriod: number;
  customerBanner: CustomerBannerState;
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
  allowTransferToEnterprise: {
    APOINT: true;
    USD: true;
    AMAS: true;
  };
  transferToEnterpriseFeePercent: {
    APOINT: 0;
    USD: 0;
    AMAS: 0;
  };
}
