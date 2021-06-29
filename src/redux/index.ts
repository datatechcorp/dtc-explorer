import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { settingReducer, SettingState } from './setting';
import { walletReducer, WalletState } from './wallet';
import { history } from '../config/history';
import { authReducer, AuthState } from './auth/auth.reducer';
import { userReducer, UserState } from './user';
import { blockReducer, BlockState } from './block';
import { txReducer, TxState } from './transaction';

export const reducer = combineReducers({
  router: connectRouter(history),
  setting: settingReducer,
  user: userReducer,
  auth: authReducer,
  wallet: walletReducer,
  block: blockReducer,
  transaction: txReducer,
});

// export type RootState = ReturnType<typeof reducer>;
export type RootState = {
  setting: SettingState;
  user: UserState;
  auth: AuthState;
  wallet: WalletState;
  block: BlockState;
  transaction: TxState;
};
