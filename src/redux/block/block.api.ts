import { commonApi } from '../common';
import { BlocksResponse } from './block.interface';
import { GetBlocksDto } from './dto';

function getBlocks(query: Partial<GetBlocksDto>) {
  const api = `/blocks${commonApi.formatQuery(query)}`;
  return commonApi.fetchData<BlocksResponse | null>(api);
}

export const blockApi = {
  getBlocks,
};
