import { BaseResponse, commonApi } from '../common';
import { GetPriceHistoryDto } from './dto';

function getPriceHistories(
  query: GetPriceHistoryDto,
): Promise<BaseResponse<any> | null> {
  const api = `/price/history${commonApi.formatQuery(query)}`;
  return commonApi.fetchData<any>(api);
}
export const priceHistoryApi = {
  getPriceHistories,
};
