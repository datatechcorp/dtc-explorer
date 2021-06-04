import { CartState } from './cart.interface';

export const cartInitialState: CartState = {
  isFetching: false,
  isGot: false,
  cart: [],
  selectedCart: null,
  selectedAddress: null,
  paymentCoin: null,
  paymentWallet: null,
};
