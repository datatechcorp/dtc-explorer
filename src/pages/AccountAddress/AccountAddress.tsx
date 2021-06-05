import { Tabs, Typography, Row, Col } from 'antd';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
import { userAction } from '../../redux/user';
import { Address } from './Components/Address';
import { Transactions } from './Components/Transactions';

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
        <div className="sec-accountAddress">
          <div className="container">
            <Row gutter={[8, 16]}>
              <Col span={24}>
                <Title className="text-red" level={2}>
                  Account
                </Title>
                <Col span={24}>
                  <Address />
                </Col>
              </Col>
            </Row>
            <Row gutter={[8, 16]}>
              <Col span={24}>
                <Title className="text-red" level={2}>
                  Transactions
                </Title>
              </Col>
              <Col span={24}>
                <Transactions />
              </Col>
            </Row>
          </div>
        </div>
      </>
    );
  }
}

export const AccountAddress = connector(Screen);
