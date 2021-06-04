import { Col, Row } from 'antd';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { setting } from '../../../config/setting';
import { RootState } from '../../../redux';
import utils from '../../../utils/utils';
import FlipNumbers from 'react-flip-numbers';

const mapStateToProps = (state: RootState): any => ({});
const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class Screen extends React.Component<PropsFromRedux> {
  render(): JSX.Element {
    const home_stats = [
      {
        name: 'Latest block number',
        value: utils.formatSeparator(12831832, 6),
      },
      {
        name: 'Total Txns',
        value: utils.formatSeparator(12831832, 6),
      },
      {
        name: 'Total Accounts',
        value: utils.formatSeparator(12831832, 6),
      },
      {
        name: 'Current/Max TPS',
        value: '1/626',
      },
      {
        name: 'Total Nodes',
        value: utils.formatSeparator(100, 6),
      },
      {
        name: `Total ${setting.symbol} Frozen`,
        value: utils.formatSeparator(12831832123123, 6),
      },
      {
        name: 'Contracts',
        value: utils.formatSeparator(312331, 6),
      },
      {
        name: 'Tokens',
        value: utils.formatSeparator(12831, 6),
      },
    ];

    return (
      <div className="panel-group-wrapper">
        <div className="panel-group">
          <Row
            type="flex"
            justify="space-between"
            gutter={[8, 16]}
            // className="card-body"
          >
            {home_stats.map((item) => (
              <Col
                className="hover-gray"
                // span={24}
                // lg={4}
                // md={4}
                // xs={6}
                key={item.name}
              >
                <a href="!#" onClick={(e) => e.preventDefault()}>
                  <p className="panel-title">
                    <span>{item.name}</span>
                  </p>
                  <h2 className="hover-red">
                    {/* <span>{item.value}</span> */}
                    <div className="counter__wrapper">
                      <FlipNumbers
                        height={24}
                        width={24}
                        duration={5}
                        play
                        perspective={100}
                        numbers={item.value}
                      />
                    </div>
                  </h2>
                </a>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }
}

export const InforMarket = connector(Screen);
