import { Action, createAction } from '../common';
import { settingApi } from './setting.api';
import { currencyFormatter } from '../../utils/currency-formatter';

export const Types = {
  changeFields: 'app.setting.change-fields',
};

const changeFields = (object: any = {}): Action =>
  createAction(Types.changeFields, object);

const getConfigs = () => (dispatch): void => {
  settingApi.getConfigs().then((response) => {
    if (!response) {
      return;
    }

    if (response.code === 200) {
      currencyFormatter.setCurrencyRates(response.data.countryCurrencyPrice);
      dispatch(
        changeFields({
          'config.transferFeePercent': response.data.transferFeePercent,
          'config.withdrawFeePercent': response.data.withdrawFeePercent,
          'config.swapFeePercent': response.data.swapFeePercent,
          'config.customerBanner': response.data.customerBanner,
          'config.allowTransfer': response.data.allowTransfer,
          'config.allowSwap': response.data.allowSwap,
          'config.allowPaymentType': response.data.allowPaymentType,
          'config.allowWithdraw': response.data.allowWithdraw,
          'config.allowLending': response.data.allowLending,
          'config.minWithdraw': response.data.minWithdraw,
          'config.requiredKycBeforeWithdrawing':
            response.data.requiredKycBeforeWithdrawing,
          'config.autoCancelUnpaidOrderAfter':
            response.data.autoCancelUnpaidOrderAfter,
          price: response.data.price,
          'config.countryCurrencyPrice': response.data.countryCurrencyPrice,
          'config.notification': response.data.notification,
          'config.tradeFeePercent': response.data.tradeFeePercent,
          'config.allowTransferToEnterprise':
            response.data.allowTransferToEnterprise,
          'config.transferToEnterpriseFeePercent':
            response.data.transferToEnterpriseFeePercent,
        }),
      );
    }
  });
};

export const settingAction = {
  changeFields,
  getConfigs,
};
