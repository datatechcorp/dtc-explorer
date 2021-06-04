import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../redux';
import { Row, Col, Tooltip, Tag, Typography } from 'antd';
import iconQuestion from '../../../assets/images/icons/question.svg';
import { CopyableText } from '../../../components';
import {
  FaRegCheckCircle,
  FaExclamationCircle,
  FaExchangeAlt,
} from 'react-icons/fa';
import { BiTime } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { routeName } from '../../../config/route-name';
import { txAction } from '../../../redux/transaction';
import { setting } from '../../../config/setting';
import utils from '../../../utils/utils';
import contract from '../../../assets/images/icons/contract.svg';

const { Title } = Typography;

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  tickTx: state.transaction.tickTx,
});
const mapDispatchToProps = {
  getTxs: txAction.getTxs,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class Screen extends React.Component<PropsFromRedux> {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      minutes: 0,
    };
  }
  interval: any;
  componentDidMount() {
    this.interval = setInterval(() => {
      this.props.getTxs({ limit: setting.maxTickTxs }, 'tickTx');
    }, 3000);
  }
  componentWillUnmount(): void {
    clearInterval(this.interval);
  }
  formatTime = (number) => {
    return utils.convertTimeToString(number, 'DD-MM-YYYY hh:mm');
  };
  pad = (val) => {
    const valString = val + '';
    if (valString.length < 2) {
      return '0' + valString;
    } else {
      return valString;
    }
  };
  formatSecond = (number) => {
    const totalSeconds = Math.floor(Math.abs((Date.now() - number) / 1000));
    this.setState({
      seconds: this.pad(totalSeconds % 60),
      minutes: this.pad(totalSeconds / 60),
    });
  };
  render(): JSX.Element {
    const {
      user: { walletAddress },
      tickTx: { data },
    } = this.props;
    // console.log('data :>> ', data);
    const demoData = [
      'tronlink',
      'CryptoGuyInZasdasdasd',
      'StakedTron',
      'CryptoChain',
      'KuailianPaym',
      'https://klevadasdasdasdasd',
      'MinerGate',
      'TRXUltra',
      'KryptoKnight',
      'Binance Stak...',
      'JD Investmen...',
      'MinerGate',
      'TRXUltra',
      'KryptoKnight',
      'Binance Stak...',
      'JD Investmen...',
    ];
    return (
      <div className="sec-overview">
        <Row gutter={[16, 16]} align="middle" className="sec-overview-row">
          <Col span={4}>
            <span className="d-flex">
              <span className="mr-5">
                <Tooltip title="Hash is unique 64 characters identifier that is generated whenever a transaction is executed.">
                  <img src={iconQuestion} alt="icon" />
                </Tooltip>
              </span>
              <span>Hash:</span>
            </span>
          </Col>
          <Col span={20}>
            <span className="text-white">{walletAddress}</span>
            <CopyableText
              class="menu-copy ant-btn-link"
              value={walletAddress}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]} align="middle" className="sec-overview-row">
          <Col span={4}>
            <span className="d-flex">
              <span className="mr-5">
                <Tooltip title="The result of the transaction: FAIL or SUCCESS">
                  <img src={iconQuestion} alt="icon" />
                </Tooltip>
              </span>
              <span>Result:</span>
            </span>
          </Col>
          <Col span={20}>
            <span className="text-success text-upper">
              <FaRegCheckCircle /> Success
            </span>
            {/* <span className="text-error text-upper">
              <FaExclamationCircle /> Fail
            </span> */}
          </Col>
        </Row>
        <Row gutter={[16, 16]} align="middle" className="sec-overview-row">
          <Col span={4}>
            <span className="d-flex">
              <span className="mr-5">
                <Tooltip title="The status of the transaction: CONFIRMED or UNCONFIRMED. Transactions confirmed by 19 or SRs will be marked 'confirmed', or is 'unconfirmed'">
                  <img src={iconQuestion} alt="icon" />
                </Tooltip>
              </span>
              <span>Status:</span>
            </span>
          </Col>
          <Col span={20}>
            <Tag color="#45bf55" className="text-upper">
              confirmed
            </Tag>
            <Tag className="custom-tag">
              <span style={{ color: '#333' }}>
                Confirmed by over 200 blocks
              </span>
            </Tag>
          </Col>
        </Row>
        <Row gutter={[16, 16]} className="sec-overview-row">
          <Col span={4}>
            <span className="d-flex">
              <span className="mr-5">
                <Tooltip title="Confirmed SRs in this transaction, only the first 19 confirmed SRs are displayed">
                  <img src={iconQuestion} alt="icon" />
                </Tooltip>
              </span>
              <span>Confirmed SRs:</span>
            </span>
          </Col>
          <Col span={20}>
            <div>19</div>
            <div className="item-belong tx-sr ml-1">
              {demoData.map((item, index) => (
                <div key={index}>
                  <Link to={routeName.transaction}>{item}</Link>
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]} align="middle" className="sec-overview-row">
          <Col span={4}>
            <span className="d-flex">
              <span className="mr-5">
                <Tooltip title="The number of the block in which the transaction was recorded">
                  <img src={iconQuestion} alt="icon" />
                </Tooltip>
              </span>
              <span>Block:</span>
            </span>
          </Col>
          <Col span={20}>
            <span className="text-red">31235123</span>
          </Col>
        </Row>
        <Row gutter={[16, 16]} align="middle" className="sec-overview-row">
          <Col span={4}>
            <span className="d-flex">
              <span className="mr-5">
                <Tooltip title="On DTCORP, the creation and triggering of smart contracts consume Energy. Users can gain Energy through freezing DTC.">
                  <img src={iconQuestion} alt="icon" />
                </Tooltip>
              </span>
              <span>Time:</span>
            </span>
          </Col>
          <Col span={20}>
            <span className="d-flex">
              <span className="mr-5">
                <BiTime />
              </span>
              <span>
                {Math.floor(Math.abs((Date.now() - 1622794131000) / 1000))} secs
                ago | {this.formatTime(1622794131000)} (Local)
              </span>
            </span>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={4} style={{ color: '#fff' }}>
              <FaExchangeAlt /> Trigger Smart Contracts
            </Title>
          </Col>
        </Row>
        <Row gutter={[16, 16]} align="middle" className="sec-overview-row">
          <Col span={4}>
            <span className="d-flex">
              <span className="mr-5">
                <Tooltip title="The sending party of the transaction">
                  <img src={iconQuestion} alt="icon" />
                </Tooltip>
              </span>
              <span>Owner Address:</span>
            </span>
          </Col>
          <Col span={20}>
            <span className="text-red">{walletAddress}</span>
            <CopyableText
              class="menu-copy ant-btn-link"
              value={walletAddress}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]} align="middle" className="sec-overview-row">
          <Col span={4}>
            <span className="d-flex">
              <span className="mr-5">
                <Tooltip title="Unique 34 characters identifier that is generated for a smart contract.">
                  <img src={iconQuestion} alt="icon" />
                </Tooltip>
              </span>
              <span>Contract Address:</span>
            </span>
          </Col>
          <Col span={20}>
            <img src={contract} alt="img" />
            <span className="mr-5 text-red">{walletAddress}</span>
            <CopyableText
              class="menu-copy ant-btn-link"
              value={walletAddress}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]} align="middle" className="sec-overview-row">
          <Col span={4}>
            <span className="d-flex">
              <span className="mr-5">
                <Tooltip title="The amount of TRX consumed when triggering the contract'">
                  <img src={iconQuestion} alt="icon" />
                </Tooltip>
              </span>
              <span>Value:</span>
            </span>
          </Col>
          <Col span={20}>
            <span>0 TRX</span>
          </Col>
        </Row>
        <Row gutter={[16, 16]} className="sec-overview-row">
          <Col span={4}>
            <span className="d-flex">
              <span className="mr-5">
                <Tooltip title="Bandwidth resource that is consumed by the transaction.">
                  <img src={iconQuestion} alt="icon" />
                </Tooltip>
              </span>
              <span>Consume Bandwidth:</span>
            </span>
          </Col>
          <Col span={20}>
            <div>345 Bandwidth</div>
            <div className="item-belong tx-sr ml-1">
              Consumption of frozen/free bandwidth: 345 Bandwidth
            </div>
            <div className="item-belong tx-sr ml-1">
              Burn 0 TRX for bandwidth: 0 Bandwidth
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]} align="middle" className="sec-overview-row">
          <Col span={4}>
            <span className="d-flex">
              <span className="mr-5">
                <Tooltip title="Energy resource that is consumed by the transaction">
                  <img src={iconQuestion} alt="icon" />
                </Tooltip>
              </span>
              <span>Consume Energy:</span>
            </span>
          </Col>
          <Col span={20}>
            <div>13,596 Energy</div>
            <div className="item-belong tx-sr ml-1">
              Energy usage from user's frozen energy: 0 Energy
            </div>
            <div className="item-belong tx-sr ml-1">
              Burn 1.90344 TRX for energy: 13,596 Energy
            </div>
            <div className="item-belong tx-sr ml-1">
              Consume contract owner's Energy: 0 Energy
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]} align="middle" className="sec-overview-row">
          <Col span={4}>
            <span className="d-flex">
              <span className="mr-5">
                <Tooltip title="The maximum amount of energy consumed by a single transaction when triggering a contract">
                  <img src={iconQuestion} alt="icon" />
                </Tooltip>
              </span>
              <span>Fee Limit:</span>
            </span>
          </Col>
          <Col span={20}>
            <span>20 TRX</span>
          </Col>
        </Row>
        <Row gutter={[16, 16]} align="middle" className="sec-overview-row">
          <Col span={4}>
            <span className="d-flex">
              <span className="mr-5">
                <Tooltip title="Method used when triggering smart contract">
                  <img src={iconQuestion} alt="icon" />
                </Tooltip>
              </span>
              <span>Method Calling:</span>
            </span>
          </Col>
          <Col span={20}>
            <div>transfer(address _to,uint256 _value)</div>
            <div className="item-belong tx-sr ml-1">_value: 63081000000</div>
            <div className="item-belong tx-sr ml-1">
              _to: TAUN6FwrnwwmaEqYcckffC7wYmbaS6cBiX
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export const Overview = connector(Screen);
