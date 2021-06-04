import { Row, Col, Typography, Tabs } from 'antd';
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
import { Overview } from './Components/Overview';

const { Title } = Typography;
const { TabPane } = Tabs;

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = {
  changeFields: userAction.changeFields,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class Screen extends React.Component<PropsFromRedux, any> {
  onChange = (key) => {
    console.log(key);
  };
  render(): JSX.Element {
    return (
      <>
        <div className="sec-transaction">
          <div className="container">
            <Row gutter={[8, 16]}>
              <Col span={24}>
                <Title className="text-red" level={2}>
                  Transaction Details
                </Title>
              </Col>
            </Row>
            <Row gutter={[8, 16]}>
              <Col span={24}>
                <Tabs
                  onChange={this.onChange}
                  type="card"
                  className="transaction-tabs"
                >
                  <TabPane tab="Overview" key="1">
                    <Overview />
                  </TabPane>
                  <TabPane tab="Internal txns(2)" key="2">
                    Content of Tab Pane 2
                  </TabPane>
                  <TabPane tab="Event logs(1)" key="3">
                    Content of Tab Pane 3
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </div>
        </div>
      </>
    );
  }
}

export const Transaction = connector(Screen);
