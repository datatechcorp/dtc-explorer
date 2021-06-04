import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { walletReducer as wallet, WalletState } from './wallet';
import { history } from '../config/history';
import { authReducer as auth, AuthState } from './auth/auth.reducer';
import { categoryReducer as category, CategoryState } from './category';
import {
  settingReducer as setting,
  SettingState,
} from './setting/setting.reducer';
import { UserState } from './user';
import { orderReducer as order, OrderState } from './order';
import { userReducer as user } from './user/user.reducer';
import { productReducer as product, ProductState } from './product';
import { cartReducer as cart, CartState } from './cart';
import { addressReducer as address, AddressState } from './address';
import {
  notificationReducer as notifications,
  NotificationState,
} from './notification';
import {
  productReducer as enterpriseProductReducer,
  ProductState as EnterpriseProductState,
} from './enterprise/product';

import {
  orderReducer as enterpriseOrderReducer,
  OrderState as EnterpriseOrderState,
} from './enterprise/order';
import { enterpriseWalletReducer } from './enterprise/wallet/wallet.reducer';
import { EnterpriseWalletState } from './enterprise/wallet/wallet.interface';
import { priceHistoryReducer, PriceHistoryState } from './price-history';
import { supportReducer, SupportState } from './support';
import { partnerReducer, PartnerState } from './partner';
import { blockReducer, BlockState } from './block';
import { txReducer, TxState } from './transaction';

export const reducer = combineReducers({
  router: connectRouter(history),
  user,
  auth,
  wallet,
  setting,
  order,
  category,
  product,
  cart,
  address,
  notifications,
  enterprise: combineReducers({
    product: enterpriseProductReducer,
    order: enterpriseOrderReducer,
    wallet: enterpriseWalletReducer,
  }),
  priceHistory: priceHistoryReducer,
  support: supportReducer,
  partner: partnerReducer,
  //
  block: blockReducer,
  transaction: txReducer,
});

// export type RootState = ReturnType<typeof reducer>;
export type RootState = {
  user: UserState;
  auth: AuthState;
  wallet: WalletState;
  setting: SettingState;
  order: OrderState;
  category: CategoryState;
  product: ProductState;
  cart: CartState;
  address: AddressState;
  notifications: NotificationState;
  enterprise: {
    product: EnterpriseProductState;
    order: EnterpriseOrderState;
    wallet: EnterpriseWalletState;
  };
  priceHistory: PriceHistoryState;
  support: SupportState;
  partner: PartnerState;
  //
  block: BlockState;
  transaction: TxState;
};
