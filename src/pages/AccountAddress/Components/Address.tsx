import { Col, Row, Button, Tooltip, Card, Progress } from 'antd';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { CopyableText, QRCodeText, SendModal } from '../../../components';
import { RootState } from '../../../redux';
import { userAction } from '../../../redux/user';
import { walletAction } from '../../../redux/wallet';
import iconQuestion from '../../../assets/images/icons/question.svg';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import utils from '../../../utils/utils';

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  wallet: state.wallet,
});
const mapDispatchToProps = {
  changeFields: walletAction.changeFields,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class Screen extends React.Component<PropsFromRedux, any> {
  onDontShowAgain: () => any;
  constructor(props) {
    super(props);

    this.state = { showReceiveModal: false };
  }
  showReceiveModal = () => {
    this.setState({
      showReceiveModal: true,
    });
  };
  toggleSendModal = () => {
    this.props.changeFields({
      showSendModal: !this.props.wallet.showSendModal,
    });
  };
  formatTime = (number) => {
    return utils.convertTimeToString(number, 'DD-MM-YYYY hh:mm');
  };
  render(): JSX.Element {
    const {
      user: {
        walletAddress,
        balance,
        asset,
        drc10Token,
        drc20Token,
        bandwidth,
        bandwidthUsed,
        energy,
        energyUsed,
        reward,
        frozenBalance,
      },
    } = this.props;
    return (
      <>
        <div className="accountProperty" style={{ margin: 0 }}>
          <Row gutter={[8, 16]}>
            <Col span={24}>
              <div className="account-info">
                <div className="account-info-sec d-flex align-items-center">
                  <span className="text-red">{walletAddress}</span>
                  <span className="ml-2">
                    <CopyableText
                      class="menu-copy ant-btn-link"
                      value={walletAddress}
                    />
                  </span>
                  <span>
                    <Tooltip title="Send Tokens">
                      <Button
                        className="menu-copy ant-btn-link"
                        style={{
                          color: 'rgba(0,0,0,.45)',
                          borderColor: 'transparent',
                        }}
                        onClick={this.toggleSendModal}
                        icon="swap"
                      ></Button>
                    </Tooltip>
                  </span>
                  <span onClick={this.showReceiveModal} className="ml-3">
                    <QRCodeText
                      address={walletAddress}
                      class="menu-copy ant-btn-link"
                      icon="qrcode"
                    />
                  </span>
                </div>
              </div>
            </Col>
            <Col span={24}>
              <Card bordered={true} className="account-card">
                <Row type="flex" align="middle">
                  <Col
                    span={24}
                    lg={14}
                    md={12}
                    className="sec-overview border-right"
                  >
                    <Row
                      gutter={[0, 16]}
                      align="middle"
                      className="sec-overview-row"
                    >
                      <Col span={8}>
                        <span className="d-flex">
                          <span className="mr-5">
                            <Tooltip title="The tag content is copied from the tag information upon logging in to the DTC account">
                              <img src={iconQuestion} alt="icon" />
                            </Tooltip>
                          </span>
                          <span>My tags:</span>
                        </span>
                      </Col>
                      <Col span={16}>
                        <span className="text-white">
                          The content will show after login.
                        </span>
                      </Col>
                    </Row>
                    <Row
                      gutter={[0, 16]}
                      align="middle"
                      className="sec-overview-row"
                    >
                      <Col span={8}>
                        <span className="d-flex">
                          <span className="mr-5">
                            <Tooltip title="Name of the account">
                              <img src={iconQuestion} alt="icon" />
                            </Tooltip>
                          </span>
                          <span>Name:</span>
                        </span>
                      </Col>
                      <Col span={16}>
                        <span className="text-white">-</span>
                      </Col>
                    </Row>
                    <Row
                      gutter={[0, 16]}
                      align="middle"
                      className="sec-overview-row"
                    >
                      <Col span={8}>
                        <span className="d-flex">
                          <span className="mr-5">
                            <Tooltip title="Sum of the value of all tokens in the account">
                              <img src={iconQuestion} alt="icon" />
                            </Tooltip>
                          </span>
                          <span>Total Balance:</span>
                        </span>
                      </Col>
                      <Col span={16}>
                        <p className="text-warning mb-0">
                          5,750,609.311046 TRX{' '}
                          <small className="text-white">
                            (452,684.802 USD)
                          </small>
                        </p>
                      </Col>
                    </Row>
                    <Row
                      gutter={[0, 16]}
                      align="middle"
                      className="sec-overview-row"
                    >
                      <Col span={8}>
                        <span className="d-flex">
                          <span className="mr-5">
                            <Tooltip title="TRX Balance of The Account">
                              <img src={iconQuestion} alt="icon" />
                            </Tooltip>
                          </span>
                          <span>TRX Balance:</span>
                        </span>
                      </Col>
                      <Col span={16}>
                        <span className="text-white mb-0">
                          0 TRX (Available: 0 TRX Freeze: 0 TRX )
                        </span>
                      </Col>
                    </Row>
                    <Row
                      gutter={[0, 16]}
                      align="middle"
                      className="sec-overview-row"
                    >
                      <Col span={8}>
                        <span className="d-flex">
                          <span className="mr-5">
                            <Tooltip title="You need to manually claim the voting rewards distributed by SRs after each voting round.">
                              <img src={iconQuestion} alt="icon" />
                            </Tooltip>
                          </span>
                          <span>Unwithdrawn voting reward:</span>
                        </span>
                      </Col>
                      <Col span={16}>
                        <span className="text-white mb-0">0 TRX</span>
                      </Col>
                    </Row>
                    <Row
                      gutter={[0, 16]}
                      align="middle"
                      className="sec-overview-row"
                    >
                      <Col span={8}>
                        <span className="d-flex">
                          <span className="mr-5">
                            <Tooltip title="Transaction Count for the Account">
                              <img src={iconQuestion} alt="icon" />
                            </Tooltip>
                          </span>
                          <span>Transactions:</span>
                        </span>
                      </Col>
                      <Col span={16}>
                        <span className="text-white mb-0">0 Txns</span>
                      </Col>
                    </Row>
                    <Row
                      gutter={[0, 16]}
                      align="middle"
                      className="sec-overview-row"
                    >
                      <Col span={8}>
                        <span className="d-flex">
                          <span className="mr-5">
                            <Tooltip title="Number of TRX/TRC10/TRC20 token transfers related to this account">
                              <img src={iconQuestion} alt="icon" />
                            </Tooltip>
                          </span>
                          <span>Transfer:</span>
                        </span>
                      </Col>
                      <Col span={16}>
                        <span className="text-white mb-0">
                          87 Txns (<FaArrowDown className="text-error" /> 79
                          Txns <FaArrowUp className="text-red" /> 8 Txns)
                        </span>
                      </Col>
                    </Row>
                    <Row
                      gutter={[0, 16]}
                      align="middle"
                      className="sec-overview-row"
                    >
                      <Col span={8}>
                        <span className="d-flex">
                          <span className="mr-5">
                            <Tooltip title="Time of Account Created on MainNet">
                              <img src={iconQuestion} alt="icon" />
                            </Tooltip>
                          </span>
                          <span>Created:</span>
                        </span>
                      </Col>
                      <Col span={16}>
                        <span className="text-white mb-0">
                          {this.formatTime(1622794131000)} (Local)
                        </span>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24} lg={10} md={12}>
                    <section
                      className="progress-sec"
                      style={{ width: 'auto', margin: '24px 24px' }}
                    >
                      <div className="d-flex ant-row-flex-space-between">
                        <div className="num">
                          0<span className="limit">/{energy}</span>
                        </div>
                        <span className="tips">
                          <span>DataTechCorp Power</span>
                          <span className="ml-1">
                            <Tooltip title="DTCORP Power (BP) is used for voting for DTCORP SRs. Users can gain BP through freezing DTC.">
                              <img src={iconQuestion} alt="icon" />
                            </Tooltip>
                          </span>
                        </span>
                      </div>
                      <Progress
                        strokeColor="rgb(69,191,85)"
                        percent={parseFloat(
                          utils.formatSeparator(
                            ((frozenBalance - 0) * 100) / frozenBalance,
                            2,
                          ),
                        )}
                        status="active"
                        strokeWidth={16}
                      />
                    </section>
                    <section
                      className="progress-sec"
                      style={{ width: 'auto', margin: '24px 24px' }}
                    >
                      <div className="d-flex ant-row-flex-space-between">
                        <div className="num">
                          0<span className="limit">/{energy}</span>
                        </div>
                        <span className="tips">
                          <span>Energy</span>
                          <span className="ml-1">
                            <Tooltip title="On DTCORP, the creation and triggering of smart contracts consume Energy. Users can gain Energy through freezing DTC.">
                              <img src={iconQuestion} alt="icon" />
                            </Tooltip>
                          </span>
                        </span>
                      </div>
                      <Progress
                        strokeColor="rgb(69,191,85)"
                        percent={
                          +utils.formatSeparator(
                            ((energy - energyUsed) * 100) / energy,
                            2,
                          )
                        }
                        status="active"
                        strokeWidth={16}
                      />
                    </section>
                    <section
                      className="progress-sec"
                      style={{ width: 'auto', margin: '24px 24px' }}
                    >
                      <div className="d-flex ant-row-flex-space-between">
                        <div className="num">
                          {bandwidthUsed}
                          <span className="limit">/{bandwidth}</span>
                        </div>
                        <span className="tips">
                          <span>Bandwidth</span>
                          <span className="ml-1">
                            <Tooltip title="On DTCORP, bandwidths will be consumed with any transaction but query 5,000 bandwidths will be given to each activated account every day by the system. Users can earn bandwidths by freezing DTC.">
                              <img src={iconQuestion} alt="icon" />
                            </Tooltip>
                          </span>
                        </span>
                      </div>
                      <Progress
                        strokeColor="rgb(69,191,85)"
                        percent={
                          +utils.formatSeparator(
                            ((bandwidth - bandwidthUsed) * 100) / bandwidth,
                            2,
                          )
                        }
                        status="active"
                        strokeWidth={16}
                      />
                    </section>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
        <SendModal />
      </>
    );
  }
}

export const Address = connector(Screen);
