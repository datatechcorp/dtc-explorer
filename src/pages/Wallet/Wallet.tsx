import { Row, Col } from 'antd';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
import {
  CopyableText,
  QRCodeText,
  CurrencyCard,
  AssetCard,
  ObtainCard,
  VoteCard,
} from '../../components';
import { WalletHistory } from '../../components/WalletHistory';
import iconTrx from '../../assets/images/icons/bce.png';
import { setting } from '../../config/setting';
import { userAction } from '../../redux/user';

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  wallet: state.wallet,
});
const mapDispatchToProps = {
  changeFields: userAction.changeFields,
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
  render(): JSX.Element {
    const {
      user: { walletAddress, balance, asset, drc10Token, drc20Token },
    } = this.props;
    return (
      <>
        <div className="accountProperty">
          <div className="container">
            <Row gutter={[8, 16]}>
              <Col span={24}>
                <div className="account-info">
                  <div className="account-info-sec d-flex align-items-center">
                    <span className="text-red">{walletAddress}</span>
                    <span className="ml-2">
                      <CopyableText class="menu-copy" value="ali" />
                    </span>
                    <span onClick={this.showReceiveModal} className="ml-3">
                      <QRCodeText class="menu-copy" icon="qrcode" />
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
            <Row gutter={[8, 16]} type="flex">
              <Col span={8} xs={24} md={8}>
                <AssetCard />
              </Col>
              <Col span={8} xs={24} md={8}>
                <ObtainCard />
              </Col>
              <Col span={8} xs={24} md={8}>
                <VoteCard />
              </Col>
            </Row>
            {/* <Row gutter={[8, 16]}>
              <Col span={24} className="propertysetting">
                <div>
                  <span className="addProperty">
                    <img src={iconAdd} alt="icon" />
                    <span className="addpropertyCont">
                      <span>Add Assets</span>
                    </span>
                  </span>
                  <span>
                    <Switch />{' '}
                    <span className="hideSmallCurrency">
                      <span>Hide Small Balances</span>
                    </span>
                  </span>
                </div>
              </Col>
            </Row> */}
            <Row gutter={[8, 16]}>
              <Col span={24}>
                <div className="table-list-sec">
                  <Row gutter={[8, 16]}>
                    <Col span={8} xs={24} md={12} xl={8}>
                      <div className="scrollbar-container ps">
                        <div className="ownCurrency">
                          <CurrencyCard
                            title={setting.symbol}
                            icon={iconTrx}
                            valueTrx={balance}
                            freeze={0}
                            valueUsd={balance * setting.priceInUsd}
                            active={true}
                            trx={true}
                            user={this.props.user}
                            changeFields={this.props.changeFields}
                          />
                          {asset.map((el) => {
                            return (
                              <CurrencyCard
                                key={el.key}
                                active={true}
                                drc10={true}
                                icon={iconTrx}
                                asset={el}
                                user={this.props.user}
                                changeFields={this.props.changeFields}
                              />
                            );
                          })}
                          {drc20Token.map((el) => {
                            const { contractAddress } = el;
                            return (
                              <CurrencyCard
                                key={contractAddress}
                                active={true}
                                drc20={true}
                                drc20Data={el}
                                icon={iconTrx}
                                user={this.props.user}
                                changeFields={this.props.changeFields}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </Col>
                    <Col span={16} xs={24} md={12} xl={16}>
                      <div className="scrollbar-container ps">
                        <div className="card-list-table">
                          <WalletHistory />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </>
    );
  }
}

export const Wallet = connector(Screen);
