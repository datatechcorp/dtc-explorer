import { blockApi } from './block.api';
import { Action, createAction } from '../common';
import { notification } from '../../utils/notification';
import { GetBlocksDto } from './dto';
import { RootState } from '..';
import { setting } from '../../config/setting';
import { Block } from './block.interface';

export const Types = {
  changeFields: 'app.block.change-fields',
};

const changeFields = (object: any = {}): Action =>
  createAction(Types.changeFields, object);

const getBlocks = (query: Partial<GetBlocksDto>, prefix: string) => async (
  dispatch,
  getState: () => RootState,
): Promise<boolean> => {
  dispatch(
    changeFields({
      [`${prefix}.fetching`]: true,
    }),
  );
  const response = await blockApi.getBlocks(query);
  dispatch(
    changeFields({
      [`${prefix}.fetching`]: false,
    }),
  );
  if (!response) {
    notification.error('Please check your network');
    return false;
  }
  const {
    tickBlock: { data, current },
  } = getState().block;
  const newData: Block[] = [];
  const unique: { [blockHash: string]: boolean } = {};
  let count = 0;
  response.data.concat(data).some((block) => {
    if (count === setting.maxTickBlocks) {
      return true;
    }
    if (!unique[block.blockHash]) {
      newData.push(block);
      unique[block.blockHash] = true;
      count++;
    }
  });
  dispatch(
    changeFields({
      [`${prefix}.data`]: newData,
      [`${prefix}.current`]: (newData[0] || { blockNumber: current })
        .blockNumber,
    }),
  );
  return true;
};
export const blockAction = {
  changeFields,
  getBlocks,
};
