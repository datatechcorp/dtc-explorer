import React from 'react';
import { Col, Row, Card, Button } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
import { walletAction, WalletState } from '../../redux/wallet';
import { TransactionType } from '../../models/transaction';
import utils from '../../utils/utils';
import { WithdrawTargetType } from '../../models/withdraw-types';
import { SettingState } from '../../redux/setting';
import { userAction, UserState } from '../../redux/user';
import { KycStatus } from '../../models/user';
import { routeName } from '../../config/route-name';
import { Link } from 'react-router-dom';
import { WithdrawForm } from '../../components';
import { WithdrawHistory } from '../../components/WithdrawHistory';

const mapStateToProps = (state: RootState): any => ({
  user: state.user,
  wallet: state.wallet,
  setting: state.setting,
});
const mapDispatchToProps = {
  changeFields: walletAction.changeFields,
  getMyTransactions: walletAction.getMyTransactions,
  withdraw: walletAction.withdraw,
  validateWithdraw: walletAction.validateWithdraw,
  getMyInfo: userAction.getMyInfo,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface State {
  showModal: boolean;
  type: WithdrawTargetType | null;
}
class Screen extends React.Component<PropsFromRedux, State> {
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
      dataIndex: 'wallet_type',
      key: 'wallet_type',
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
    this.state = {
      showModal: false,
      type: null,
    };
  }

  renderRequiredKyc(): JSX.Element {
    const user: UserState = this.props.user;

    let message;
    let action;
    if (user.info.kyc_status === KycStatus.Pending) {
      message = 'Your KYC is waiting for approving.';
      action = 'View';
    } else if (user.info.kyc_status === KycStatus.None) {
      message = 'You need to upload KYC before withdrawing coin';
      action = 'Upload Now';
    } else {
      message =
        'Your KYC was rejected. Please update new KYC and submit again.';
      action = 'Update';
    }

    return (
      <>
        <Row type="flex" gutter={[16, 32]}>
          <Col sm={24} xl={{ span: 8, offset: 8 }} md={{ span: 14, offset: 5 }}>
            <Card
              className="text-center card"
              title="Withdraw"
              bordered={false}
              style={{
                height: '100%',
              }}
            >
              <div>
                <Row type="flex" justify="center" className="my-5">
                  {message}
                </Row>
                <Row type="flex" justify="center" className="mt-5">
                  <Link to={routeName.kyc}>
                    <Button type="primary">{action}</Button>
                  </Link>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </>
    );
  }

  render(): JSX.Element {
    const walletState: WalletState = this.props.wallet;
    const user: UserState = this.props.user;
    const setting: SettingState = this.props.setting;

    if (
      user.info.kyc_status !== KycStatus.Approved &&
      setting.config.requiredKycBeforeWithdrawing
    ) {
      return this.renderRequiredKyc();
    }

    return (
      <div className="container">
        <Row type="flex" gutter={[16, 32]} justify="center">
          <Col xl={16} md={20} xs={24}>
            <Card title="Withdraw" className="custom-table">
              <WithdrawForm />
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 32]}>
          <Col span={24}>
            <Card title="Withdraw History" className="custom-table">
              <WithdrawHistory />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export const Withdraw = connector(Screen);
