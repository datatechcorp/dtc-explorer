import React from 'react';
import { Card, Tooltip, Progress } from 'antd';
import iconQuestion from '../assets/images/icons/question.svg';
import { ObtainModal } from '../components';
import { RootState } from '../redux';
import { walletAction } from '../redux/wallet';
import { connect, ConnectedProps } from 'react-redux';
import utils from '../utils/utils';

const mapStateToProps = (state: RootState) => ({
  wallet: state.wallet,
  user: state.user,
});
const mapDispatchToProps = {
  changeFields: walletAction.changeFields,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

class Component extends React.Component<ReduxProps, any> {
  constructor(props) {
    super(props);
  }

  toggleObtainModal = () => {
    this.props.changeFields({
      showObtainModal: !this.props.wallet.showObtainModal,
    });
  };

  render(): JSX.Element {
    const {
      user: { bandwidth, bandwidthUsed, energy, energyUsed },
    } = this.props;
    console.log('energy, energyUsed :>> ', energy, energyUsed);
    return (
      <>
        <Card bordered={true} className="account-card">
          <p className="title">
            <span>Resources</span>
          </p>
          <div className="d-flex progress-wrapper ant-row-flex-space-between">
            <section className="progress-sec">
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
              />
            </section>
            <section className="resourceBtnWrapper">
              <span
                onClick={this.toggleObtainModal}
                className="btn btn-default btn-sm text-capitalize"
              >
                <span>Obtain</span>
              </span>
            </section>
          </div>
          <div className="d-flex progress-wrapper ant-row-flex-space-between">
            <section className="progress-sec">
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
              />
            </section>
            {/* <section className="resourceBtnWrapper">
              <span className="btn btn-default btn-sm text-capitalize">
                <span>Rent</span>
              </span>
            </section> */}
          </div>
        </Card>
        <ObtainModal />
      </>
    );
  }
}

export const ObtainCard = connector(Component);
