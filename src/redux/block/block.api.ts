import { commonApi } from '../common';
import { BlocksResponse } from './block.interface';
import { GetBlocksDto } from './dto';

function getBlocks(
  query: Partial<GetBlocksDto>,
): Promise<BlocksResponse | null> {
  const api = `/blocks${commonApi.formatQuery(query)}`;
  return commonApi.flexFetchData<BlocksResponse | null>(api);
}

export const blockApi = {
  getBlocks,
};
