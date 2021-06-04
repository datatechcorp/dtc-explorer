import React from 'react';
import { Table } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../redux';
import { walletAction, WalletState } from '../redux/wallet';
import { TransactionType } from '../models/transaction';
import utils from '../utils/utils';
import { userAction } from '../redux/user';

const mapStateToProps = (state: RootState): any => ({
  user: state.user,
  wallet: state.wallet,
  setting: state.setting,
});
const mapDispatchToProps = {
  changeFields: walletAction.changeFields,
  getMyTransactions: walletAction.getMyTransactions,
  getMyInfo: userAction.getMyInfo,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class Screen extends React.Component<PropsFromRedux, any> {
  columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Amount ',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Fee ',
      dataIndex: 'fee',
      key: 'fee',
    },
    {
      title: 'Wallet',
      dataIndex: 'symbol',
      key: 'symbol',
      // render: (walletType: WalletType): JSX.Element => {
      //   return <div>{utils.getDisplayNameForWallet(walletType)}</div>;
      // },
    },
    {
      title: 'Address',
      dataIndex: 'withdraw_address',
      key: 'address',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  constructor(props) {
    super(props);
    if (props.user._id) {
      props.getMyTransactions({
        type: TransactionType.WithdrawCoin,
      });
    }
  }

  render(): JSX.Element {
    const wallet: WalletState = this.props.wallet;

    const history = wallet.transaction.data
      .filter((item) => item.type == TransactionType.WithdrawCoin)
      .map((item, index) => ({
        ...item,
        index: index + 1,
        amount: utils.formatSeparator(item.amount, 6),
        withdraw_amount: utils.formatSeparator(
          item.withdraw_amount as number,
          5,
        ),
        status: utils.toUpperCaseFirstLetter(item.status),
        date: utils.convertTimeToString(item.createdAt, 'DD-MM-YYYY hh:mm'),
        withdraw_address: item.withdraw_address,
      }));

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

export const WithdrawHistory = connector(Screen);
