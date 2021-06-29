import React from 'react';
import { Table } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../redux';
import { UserState } from '../../../redux/user';
import { CoinNetwork, walletAction, WalletState } from '../../../redux/wallet';
import { Transaction, TransactionType } from '../../../models/transaction';
import utils from '../../../utils/utils';
import { CoinType } from '../../../models/coin-types';
import _ from 'lodash';

type PropsType = {
  showCoinTypes?: CoinType[];
};
const mapStateToProps = (state: RootState) => ({
  user: state.user,
  wallet: state.wallet,
});
const mapDispatchToProps = {
  changeFields: walletAction.changeFields,
  getMyTransactions: walletAction.getMyTransactions,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class Screen extends React.Component<PropsFromRedux & PropsType> {
  columns = [
    {
      title: 'Hash',
      dataIndex: 'hash',
      key: 'hash',
    },
    {
      title: 'Block',
      dataIndex: 'block',
      key: 'block',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
    },
    {
      title: 'Transaction Type',
      dataIndex: 'type',
      key: 'type',
    },
    // {
    //   title: 'Txhash',
    //   dataIndex: 'data',
    //   key: 'tp_hash',
    //   render: (data: Transaction): JSX.Element => {
    //     let link = '';
    //     if (data.network === CoinNetwork.ERC20) {
    //       link = `https://etherscan.io/tx/${data.tp_hash}`;
    //     } else if (data.network === CoinNetwork.TRC20) {
    //       link = `https://tronscan.io/#/transaction/${data.tp_hash}`;
    //     }
    //     return (
    //       <a href={link} target="_blank" rel="noopener noreferrer">
    //         <div style={{ maxWidth: '200px' }}>{link ? 'View' : ''}</div>
    //       </a>
    //     );
    //   },
    // },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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
    {
      title: 'Token',
      dataIndex: 'token',
      key: 'token',
    },
  ];

  constructor(props) {
    super(props);

    const user: UserState = this.props.user;

    if (user._id) {
      props.getMyTransactions({
        type: TransactionType.Deposit,
      });
    }
  }

  render(): JSX.Element {
    const wallet: WalletState = this.props.wallet;

    let filterByCoin = false;
    const showCoinHash = {};
    if (this.props.showCoinTypes && _.isArray(this.props.showCoinTypes)) {
      filterByCoin = true;
      this.props.showCoinTypes.forEach((item) => {
        showCoinHash[item] = true;
      });
    }
    const history = wallet.transaction.data
      .filter((item) => {
        if (item.type === TransactionType.Deposit) {
          if (filterByCoin) {
            if (!item.deposit_coin) {
              return false;
            }
            return showCoinHash[item.deposit_coin];
          } else {
            return true;
          }
        }
        return false;
      })
      .map((item, index) => ({
        ...item,
        index: index + 1,
        amount: utils.formatSeparator(item.amount, 6),
        status: utils.toUpperCaseFirstLetter(item.status),
        date: utils.convertTimeToString(item.createdAt, 'DD-MM-YYYY hh:mm'),
        data: item,
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

export const Transactions = connector(Screen);
