import React from 'react';
import { Card } from 'antd';
import utils from '../utils/utils';
import { setting } from '../config/setting';
import { Asset, UserState } from '../redux/user';
import { sdk } from '../config/utils';
import { Drc10Token, Drc20Token } from '../redux/transaction';

type PropsType = {
  title?: string;
  active?: boolean | any;
  icon: string;
  valueTrx?: number;
  valueUsd?: number;
  freeze?: number;
  quantity?: number;
  trx?: boolean;
  drc10?: boolean;
  asset?: Asset;
  drc20?: boolean;
  drc20Data?: Drc20Token;
  symbol?: string;
  decimals?: number;
  user: UserState;
  changeFields: any;
};

export class CurrencyCard extends React.Component<PropsType, any> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      drc10Info: {},
      drc20Bal: '0',
    };
  }
  componentDidMount() {
    const {
      drc10,
      asset,
      changeFields,
      user: { drc10Token },
    } = this.props;
    if (drc10 && asset) {
      sdk.ins.dtc.getTokenByID(asset.key).then((result) => {
        const { name, abbr, total_supply } = result;
        const drc10Info: Drc10Token = {
          name,
          symbol: abbr,
          decimals: 6,
          totalSupply: total_supply.toString(),
          balance: asset.value.toString(),
          id: asset.key,
        };
        this.setState({
          drc10Info,
        });
        changeFields({
          drc10Token: [...drc10Token, drc10Info],
        });
      });
    }
  }
  render(): JSX.Element {
    return (
      <>
        <Card
          className={`currency-card ${
            this.props.active && 'currency-active-card'
          }`}
          bordered={true}
        >
          {this.props.trx && (
            <>
              <p className="title">
                <span>
                  <b className="token-img-top">
                    <img src={this.props.icon} alt="icon" />
                  </b>
                  {this.props.title}
                </span>
              </p>
              <div className="own">
                <section className="ownValue">
                  <span>Available</span> &nbsp;
                  <span>
                    {utils.formatSeparator(this.props.valueTrx || 0, 6)}&nbsp;
                    {setting.symbol}
                  </span>
                </section>
                <section className="ownUsd">
                  <span>
                    ≈{' '}
                    <span>
                      {utils.formatSeparator(this.props.valueUsd || 0, 6)}
                    </span>{' '}
                    &nbsp;USD
                  </span>
                </section>
              </div>
              <div className="own">
                <section className="ownValue">
                  <span>Freeze</span> &nbsp;
                  <span>
                    {utils.formatSeparator(this.props.freeze || 0, 6)}&nbsp;
                    {setting.symbol}
                  </span>
                </section>
              </div>
            </>
          )}
          {this.props.drc10 && this.props.asset && this.state.drc10Info.name && (
            <>
              <p className="title">
                <span>
                  <b className="token-img-top">
                    <img src={this.props.icon} alt="icon" />
                  </b>
                  {this.state.drc10Info.name}
                </span>
              </p>
              <div className="numValue">
                <section className="num text-truncate">
                  <span>Quantity</span> &nbsp;
                  <span> {this.props.asset.value}</span>
                  <span>&nbsp;{this.state.drc10Info.symbol}</span>
                </section>
              </div>
            </>
          )}
          {this.props.drc20 && this.props.drc20Data && (
            <>
              <p className="title">
                <span>
                  <b className="token-img-top">
                    <img src={this.props.icon} alt="icon" />
                  </b>
                  {this.props.drc20Data.name}
                </span>
              </p>
              <div className="numValue">
                <section className="num text-truncate">
                  <span>Quantity</span> &nbsp;
                  <span> {this.props.drc20Data.balance}</span>
                  <span>&nbsp;{this.props.drc20Data.symbol}</span>
                </section>
              </div>
            </>
          )}
        </Card>
      </>
    );
  }
}
