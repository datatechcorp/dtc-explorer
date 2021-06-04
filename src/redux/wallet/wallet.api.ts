import { BaseResponse, commonApi } from '../common';
import { MyTransactionDto } from './dto/my-transaction';
import { Transaction } from '../../models/transaction';
import utils from '../../utils/utils';
import {
  WithdrawDto,
  TransferDto,
  LendingDto,
  SwapDto,
  ChildrenStatisticDto,
  PayOrderWithoutProductDto,
  CreatePaymentCodeDto,
} from './dto';
import { UserInfo } from '../../models/user';
import {
  TransactionStatisticItem,
  LendingItem,
  Coin,
  Wallet,
} from './wallet.interface';
import { Order } from '../../models/order';
import { PaymentCode } from '../../models/payment-code';

function getMyTransactions(
  query: MyTransactionDto,
): Promise<BaseResponse<Transaction[]> | null> {
  const api = `/transaction/me${utils.formatQuery(query)}`;
  return commonApi.fetchData<Transaction[]>(api);
}

function withdraw(
  data: WithdrawDto,
): Promise<BaseResponse<Transaction> | null> {
  const api = `/wallet/withdraw`;
  return commonApi.fetchData<Transaction>(api, 'post', data);
}

function transfer(
  data: TransferDto,
): Promise<BaseResponse<Transaction> | null> {
  const api = `/wallet/transfer`;
  return commonApi.fetchData<Transaction>(api, 'post', data);
}

function getMyStatistics(): Promise<BaseResponse<
  TransactionStatisticItem[]
> | null> {
  const api = `/transaction/statistic`;
  return commonApi.fetchData<TransactionStatisticItem[]>(api);
}

function lending(data: LendingDto): Promise<BaseResponse<LendingItem> | null> {
  const api = '/investment/invest';
  return commonApi.fetchData<LendingItem>(api, 'post', data);
}

function getLendingPackage(): Promise<BaseResponse<LendingItem[]> | null> {
  const api = '/investment/me';
  return commonApi.fetchData<LendingItem[]>(api);
}

function swap(
  data: SwapDto,
): Promise<BaseResponse<{
  user: UserInfo;
  transactions: Transaction[];
}> | null> {
  const api = '/wallet/swap';
  return commonApi.fetchData<{ user: UserInfo; transactions: Transaction[] }>(
    api,
    'post',
    data,
  );
}

function getChildrenStatistic(
  data: ChildrenStatisticDto,
): Promise<BaseResponse<{
  totalSwapAmas: number;
  totalLendingUsdt: number;
  totalApoint: number;
}> | null> {
  const api = '/transaction/children-statistic' + commonApi.formatQuery(data);
  return commonApi.fetchData<{
    totalSwapAmas: number;
    totalLendingUsdt: number;
    totalApoint: number;
  }>(api);
}

function payOrderWithoutProduct(
  data: PayOrderWithoutProductDto,
): Promise<BaseResponse<{ user: UserInfo; order: Order }> | null> {
  const api = `/order/pay-order-without-product`;
  return commonApi.fetchData<{ user: UserInfo; order: Order }>(
    api,
    'post',
    data,
  );
}

function createPaymentCode(
  data: CreatePaymentCodeDto,
): Promise<BaseResponse<PaymentCode> | null> {
  const api = `/payment-code/me`;
  return commonApi.fetchData<PaymentCode>(api, 'post', data);
}

function getAllCoins(): Promise<BaseResponse<Coin[]> | null> {
  const api = `/coin/all`;
  return commonApi.fetchData<Coin[]>(api);
}

function getMyWallets(): Promise<BaseResponse<Wallet[]> | null> {
  const api = `/wallet/me`;
  return commonApi.fetchData<Wallet[]>(api);
}

function getWalletForCoin(
  coinId: string,
): Promise<BaseResponse<{ wallet: Wallet; coin: Coin }> | null> {
  const api = `/wallet/get-wallet-for-coin${commonApi.formatQuery({
    coin_id: coinId,
  })}`;
  return commonApi.fetchData<{ wallet: Wallet; coin: Coin }>(api);
}

export const walletApi = {
  getMyTransactions,
  withdraw,
  transfer,
  getMyStatistics,
  lending,
  getLendingPackage,
  swap,
  getChildrenStatistic,
  payOrderWithoutProduct,
  createPaymentCode,
  getAllCoins,
  getMyWallets,
  getWalletForCoin,
};
