import { Icon } from 'antd';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import trxLogo from '../../../assets/images/icons/bce.png';
import { setting } from '../../../config/setting';

const mapStateToProps = (): any => ({});
const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class Screen extends React.Component<PropsFromRedux> {
  constructor(props) {
    super(props);
  }
  render(): JSX.Element {
    return (
      <div className="trxgroup-wrapper-card">
        <div className="trxgroup-wrapper-card-header">
          <div className="trxgroup-logo">
            <img src={trxLogo} alt="logo" />
            <div>
              <h4>DTC</h4>
              <p>{setting.priceInUsd} USD</p>
            </div>
          </div>
          <div className="trxgroup-time">
            <p className="trxgroup-time-ago"></p>
            <p className="trxgroup-wave up">
              + <span>0%</span> <Icon type="arrow-up" />
            </p>
          </div>
        </div>
        <div className="trxgroup-wrapper-card-content">
          <p className="trxgroup-wrapper-card-title">
            <span>Market Cap</span>
          </p>
          <p className="trxgroup-wrapper-card-number">
            <span>446,427,066,791.046 USD</span>
          </p>
          <p className="trxgroup-wrapper-card-title">
            <span>24H Volume</span>
          </p>
          <p className="trxgroup-wrapper-card-number">
            <span>1,375,501,867.035 USD</span>
          </p>
        </div>
      </div>
    );
  }
}

export const MarketVolume = connector(Screen);
