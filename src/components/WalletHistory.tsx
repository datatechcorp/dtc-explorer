import React from 'react';
import { Table } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../redux';
import { walletAction } from '../redux/wallet';
import { TransactionType } from '../models/transaction';
import utils from '../utils/utils';
import { userAction } from '../redux/user';
import { txAction } from '../redux/transaction';
import { sdk } from '../config/utils';

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  wallet: state.wallet,
  setting: state.setting,
  transaction: state.transaction,
});
const mapDispatchToProps = {
  changeFields: walletAction.changeFields,
  getMyInfo: userAction.getMyInfo,
  getMyTxs: txAction.getMyTxs,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class Screen extends React.Component<PropsFromRedux, any> {
  columns = [
    {
      title: 'Hash',
      dataIndex: 'hash',
      key: 'hash',
      render: (hash: string) => (
        <div className="text-red ellipsis_box w-100">
          <div className="left">{hash}</div>
          {hash.slice(-5)}
        </div>
      ),
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      render: (from: string) => (
        <div className="ellipsis_box w-100">
          <div className="left">{from}</div>
          {from.slice(-5)}
        </div>
      ),
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      render: (to: string) => (
        <div className="ellipsis_box w-100">
          <div className="left">{to}</div>
          {to.slice(-5)}
        </div>
      ),
    },
    {
      title: 'Transaction Type',
      dataIndex: 'txType',
      key: 'txType',
      render: (type: string) => (
        <div>
          {type === 'TransferContract'
            ? 'Transfer'
            : type === 'FreezeBalanceContract'
            ? 'Freeze'
            : type === 'TransferAssetContract'
            ? 'Transfer Asset'
            : type}
        </div>
      ),
    },
    {
      title: 'Result',
      dataIndex: 'result',
      key: 'result',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  componentDidMount() {
    if (this.props.transaction.mine.length === 0) {
      this.props.getMyTxs();
    }
  }

  render(): JSX.Element {
    const history = this.props.transaction.mine.map((item, index) => {
      const {
        assetName,
        assetAmount,
        result,
        fromAddress,
        toAddress,
        transactionId,
        contractType,
      } = item;
      let amount = assetAmount || 0;
      if (!assetName || assetName === 'trx') {
        amount = sdk.ins.fromSun(amount);
      }
      return {
        ...item,
        key: transactionId || Date.now().toString(),
        hash: transactionId || '',
        from: fromAddress || '',
        to: toAddress || '',
        txType: contractType || 'Transfer',
        result: result || 'Invalid',
        amount,
      };
    });
    console.log('history :>> ', history);
    return (
      <Table
        className="table-responsive"
        columns={this.columns}
        dataSource={history}
        bordered
      />
    );
  }
}

export const WalletHistory = connector(Screen);
