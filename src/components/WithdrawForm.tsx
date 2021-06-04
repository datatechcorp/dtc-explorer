import React from 'react';
import {
  Col,
  Row,
  Card,
  Table,
  Form,
  Input,
  Icon,
  Button,
  Modal,
  Avatar,
  Select,
  InputNumber,
} from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../redux';
import { walletAction, WalletState } from '../redux/wallet';
import { TransactionType } from '../models/transaction';
import utils from '../utils/utils';
import { WithdrawTargetType } from '../models/withdraw-types';
import { SettingState } from '../redux/setting';
import { userAction, UserState } from '../redux/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBtc, faEthereum } from '@fortawesome/free-brands-svg-icons';
import UsdtIcon from '../assets/images/icons/usdt.png';
import Atoken from '../assets/images/icons/amas_token.png';
import { KycStatus } from '../models/user';
import { routeName } from '../config/route-name';
import { Link, withRouter } from 'react-router-dom';
import { CustomCard } from './CustomCard';
import stringParser from 'query-string';
import { push } from 'connected-react-router';

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
  getMyWallets: walletAction.getMyWallets,
  getWalletForCoin: walletAction.getWalletForCoin,
  push: push,
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

  coinId: string;
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      type: null,
    };

    const userState: UserState = props.user;
    if (userState._id) {
      props.getMyTransactions({
        type: TransactionType.WithdrawCoin,
      });
    }

    const search = props.location.search;
    if (search) {
      const query = stringParser.parse(search);
      if (query && query.coin) {
        props.getWalletForCoin(query.coin).then((success) => {
          if (!success) {
            props.push(routeName.wallet);
          } else {
            this.coinId = query.coin as string;
            // props.getAllCoins();
            const walletState = this.props.wallet as WalletState;
            this.changeField('wallet', walletState.walletByCoin[this.coinId]);
          }
        });
        return;
      }
    }

    props.push(routeName.wallet);
  }

  withdraw = (): void => {
    const wallet: WalletState = this.props.wallet;

    this.props
      .validateWithdraw({
        ...wallet.withdraw,
        wallet_id: wallet.withdraw.wallet?._id,
      })
      .then(({ success }) => {
        if (success) {
          this.setState({ showModal: true });
        }
      });
  };

  onConfirm = (): void => {
    const wallet: WalletState = this.props.wallet;
    this.setState({ showModal: false, type: null });
    this.props
      .withdraw({
        ...wallet.withdraw,
        wallet_id: wallet.withdraw.wallet?._id,
      })
      .then((success) => {
        if (success) {
          this.props.getMyWallets().then((success) => {
            if (success) {
              const walletState = this.props.wallet as WalletState;
              this.changeField('wallet', walletState.walletByCoin[this.coinId]);
            }
          });
        }
      });
  };

  changeField = (key: string, value: any): void => {
    this.props.changeFields({
      [`withdraw.${key}`]: value,
      [`withdraw.${key}Error`]: null,
    });
  };

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

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const selectedWallet = walletState.withdraw.wallet;
    const amount = walletState.withdraw.amount || 0;
    const feePercent = 0;
    const fee = (amount * feePercent) / 100;
    const total = amount + fee;
    return (
      <>
        <Row gutter={[8, 16]} type="flex" justify="space-around">
          <Col xl={12} xs={24} md={12}>
            <CustomCard title={`Total Balance`}>
              <h3>
                {`${utils.formatSeparator(
                  selectedWallet?.total_amount || 0,
                  5,
                )} ${selectedWallet?.symbol || ''}`}
              </h3>
            </CustomCard>
          </Col>
          <Col xl={12} xs={24} md={12}>
            <CustomCard title={`Available Balance`}>
              <h3>
                {`${utils.formatSeparator(
                  selectedWallet?.available_amount || 0,
                  5,
                )} ${selectedWallet?.symbol || ''}`}
              </h3>
            </CustomCard>
          </Col>
        </Row>
        <Row type="flex" gutter={[16, 4]} className="withdraw-form">
          <Col span={24}>
            <Form.Item
              label="Amount"
              validateStatus={
                walletState.withdraw.amountError ? 'error' : 'success'
              }
              help={walletState.withdraw.amountError}
            >
              <InputNumber
                // addonBefore={<Avatar size="small" src={Atoken} />}
                style={{ width: '100%' }}
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e): void => {
                  this.changeField('amount', e);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label={`Fee ${feePercent}%`}>
              <Input
                disabled
                // addonBefore={<Avatar size="small" src={Atoken} />}
                placeholder="Amount"
                value={fee}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Received Address"
              validateStatus={
                walletState.withdraw.addressError ? 'error' : 'success'
              }
              help={walletState.withdraw.addressError}
            >
              <Input
                addonBefore={<Icon type="wallet" />}
                placeholder="Received address"
                value={walletState.withdraw.address}
                onChange={(e): void =>
                  this.changeField('address', e.target.value)
                }
              />
            </Form.Item>
          </Col>
          <Col span={24} className="text-center">
            <Button
              className="mt-15"
              type="primary"
              loading={walletState.withdraw.isFetching}
              onClick={(): void => this.withdraw()}
            >
              Request
            </Button>
            <div
              style={{
                marginTop: '16px',
              }}
            >
              <small>
                You will receive TOKEN into your wallet within 24 hours.
              </small>
            </div>
          </Col>
        </Row>
        <Modal
          title="Confirm"
          visible={this.state.showModal}
          onOk={this.onConfirm}
          okText="Withdraw"
          cancelText="Cancel"
          style={{
            minWidth: '350px',
            width: '350px',
          }}
          onCancel={(): void => this.setState({ showModal: false })}
        >
          <Form {...formItemLayout}>
            <Form.Item className="mb-5" label={'Address'}>
              <Input
                disabled
                style={{
                  color: 'black',
                  cursor: 'pointer',
                }}
                value={walletState.withdraw.address}
              />
            </Form.Item>
            <Form.Item className="mb-5" label="Amount">
              <Input
                disabled
                style={{
                  color: 'black',
                  cursor: 'pointer',
                }}
                // addonBefore={<Avatar size="small" src={Atoken} />}
                value={`${utils.formatSeparator(amount)} ${
                  selectedWallet?.symbol || ''
                }`}
              />
            </Form.Item>
            <Form.Item className="mb-5" label="Fee">
              <Input
                disabled
                style={{
                  color: 'black',
                  cursor: 'pointer',
                }}
                // addonBefore={<Avatar size="small" src={Atoken} />}
                value={`${utils.formatSeparator(fee)} ${
                  selectedWallet?.symbol || ''
                }`}
              />
            </Form.Item>
            <Form.Item className="mb-5" label="Total">
              <Input
                disabled
                style={{
                  color: 'black',
                  cursor: 'pointer',
                }}
                // addonBefore={<Avatar size="small" src={Atoken} />}
                value={`${utils.formatSeparator(total)} ${
                  selectedWallet?.symbol || ''
                }`}
              />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export const WithdrawForm = withRouter(connector(Screen));
