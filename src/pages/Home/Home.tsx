import { Col, Row, Select } from 'antd';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
import { MarketVolume } from './Components/MarketVolume';
import { InforMarket } from './Components/InforMarket';
import { Blocks } from './Components/Blocks';
import { Transactions } from './Components/Transactions';
import { sdk } from '../../config/utils';
import { setting } from '../../config/setting';

const { Option } = Select;

const mapStateToProps = (state: RootState): any => ({
  user: state.user,
  wallet: state.wallet,
});
const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class Screen extends React.Component<PropsFromRedux, any> {
  onDontShowAgain: () => any;
  constructor(props) {
    super(props);

    this.state = {};
  }
  async componentDidMount(): Promise<void> {
    const res = await sdk.ping();
    console.log('ok', res);
  }

  render(): JSX.Element {
    const d = new Date();
    const options = {
      title: {
        text: 'Daily Txns(14 Days)',
        align: 'left',
        x: 0,
        style: {
          color: '#fff',
          fontSize: '14px',
        },
      },
      chart: {
        height: 180,
        backgroundColor: '#313131',
      },
      series: [
        {
          name: 'Main Chain',
          color: '#45BF55',
          endColumn: 300000,
          data: [
            43934, 52503, 57177, 69658, 97031, 119931, 137133, 276000, 43934,
            52503, 57177, 69658, 97031, 119931,
          ],
          pointStart: d.setDate(d.getDate() - 14),
          pointInterval: 24 * 36e5,
        },
      ],
      xAxis: {
        type: 'datetime',
        labels: {
          // format: '{value: %b. %y}',
        },
      },
      yAxis: {
        softMax: 10,
        title: {
          text: '',
        },
        labels: {
          maxStaggerLines: 2,
        },
        tickPositions: [0, 100000, 200000, 300000],
        gridLineWidth: 0,
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
    };
    const options_2 = {
      title: {
        text: 'Account Growth(14 Days)',
        align: 'left',
        x: 0,
        style: {
          color: '#fff',
          fontSize: '14px',
        },
      },
      chart: {
        // height: 200,
        backgroundColor: '#313131',
      },
      series: [
        {
          name: 'Total Account',
          color: '#45BF55',
          type: 'spline',
          data: [
            439340, 525030, 571770, 696580, 970310, 1199310, 1371330, 2760000,
            439340, 525030, 571770, 696580, 970310, 1199310,
          ],
          // pointStart: d.setDate(d.getDate() - 14),
          // pointInterval: 24 * 36e5,
        },
        {
          name: 'Active Accounts',
          type: 'column',
          color: '#ffb822',
          data: [
            43934, 52503, 57177, 69658, 97031, 119931, 137133, 276000, 43934,
            52503, 57177, 69658, 97031, 119931,
          ],
        },
        {
          name: 'New Accounts',
          type: 'column',
          data: [
            43934, 52503, 57177, 69658, 97031, 119931, 137133, 276000, 43934,
            52503, 57177, 69658, 97031, 119931,
          ],
        },
      ],
      xAxis: {
        type: 'datetime',
        labels: {
          format: '{value: %b. %y}',
        },
        title: {
          color: '#fff',
        },
        pointStart: d.setDate(d.getDate() - 14),
        pointInterval: 24 * 36e5,
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        crosshair: true,
      },
      // yAxis: {
      //   softMax: 10,
      //   title: {
      //     text: '',
      //   },
      //   labels: {
      //     maxStaggerLines: 2,
      //   },
      //   tickPositions: [0, 100000, 200000, 300000],
      // },
      yAxis: [
        {
          // Primary yAxis
          labels: {
            // format: '{value}°C',
            style: {
              color: '#45BF55',
            },
          },
          title: {
            text: 'Total Account',
            style: {
              color: '#45BF55',
            },
          },
          gridLineWidth: 0,
        },
        {
          // Secondary yAxis
          title: {
            text: 'Active Accounts',
            style: {
              color: '#ffb822',
            },
          },
          labels: {
            style: {
              color: '#ffb822',
            },
          },
          opposite: true,
          gridLineWidth: 0,
        },
        {
          // Secondary yAxis
          title: {
            text: 'New Accounts',
            style: {
              color: '#fff',
            },
          },
          labels: {
            style: {
              color: '#fff',
            },
          },
          opposite: true,
        },
      ],
      legend: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        itemStyle: {
          color: '#E0E0E3',
        },
        itemHoverStyle: {
          color: '#FFF',
        },
        itemHiddenStyle: {
          color: '#606063',
        },
        title: {
          style: {
            color: '#C0C0C0',
          },
        },
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
    };
    const options_3 = {
      title: {
        text: 'Contract Triggers(14 Days)',
        align: 'left',
        x: 0,
        style: {
          color: '#fff',
          fontSize: '14px',
        },
      },
      chart: {
        // height: 200,
        backgroundColor: '#313131',
      },
      series: [
        {
          name: 'Number of Calls',
          color: '#45BF55',
          type: 'spline',
          data: [
            439340, 525030, 571770, 696580, 970310, 1199310, 1371330, 2760000,
            439340, 525030, 571770, 696580, 970310, 1199310,
          ],
          // pointStart: d.setDate(d.getDate() - 14),
          // pointInterval: 24 * 36e5,
        },
        {
          name: 'Calling Accounts',
          type: 'spline',
          color: '#ffb822',
          data: [
            43934, 52503, 57177, 69658, 97031, 119931, 137133, 276000, 43934,
            52503, 57177, 69658, 97031, 119931,
          ],
        },
      ],
      xAxis: {
        type: 'datetime',
        labels: {
          format: '{value: %b. %y}',
        },
        // pointStart: d.setDate(d.getDate() - 14),
        // pointInterval: 24 * 36e5,
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        crosshair: true,
      },
      yAxis: [
        {
          // Primary yAxis
          labels: {
            // format: '{value}°C',
            style: {
              color: '#45BF55',
            },
          },
          title: {
            text: 'Number of Calls',
            style: {
              color: '#45BF55',
            },
          },
          gridLineWidth: 0,
        },
        {
          // Secondary yAxis
          title: {
            text: 'Calling Accounts',
            style: {
              color: '#ffb822',
            },
          },
          labels: {
            style: {
              color: '#ffb822',
            },
          },
          opposite: true,
          gridLineWidth: 0,
        },
      ],
      legend: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        itemStyle: {
          color: '#E0E0E3',
        },
        itemHoverStyle: {
          color: '#FFF',
        },
        itemHiddenStyle: {
          color: '#606063',
        },
        title: {
          style: {
            color: '#C0C0C0',
          },
        },
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
    };
    const options_4 = {
      title: {
        text: 'Daily Resource Consumption(14 Days)',
        align: 'left',
        x: 0,
        style: {
          color: '#fff',
          fontSize: '14px',
        },
      },
      chart: {
        // height: 200,
        backgroundColor: '#313131',
      },
      series: [
        {
          name: 'Main Chain',
          color: '#45BF55',
          endColumn: 300000,
          data: [
            43934, 52503, 57177, 69658, 97031, 119931, 137133, 276000, 43934,
            52503, 57177, 69658, 97031, 119931,
          ],
          pointStart: d.setDate(d.getDate() - 14),
          pointInterval: 24 * 36e5,
        },
      ],
      xAxis: {
        type: 'datetime',
        labels: {
          // format: '{value: %b. %y}',
        },
      },
      yAxis: {
        softMax: 10,
        title: {
          text: '',
        },
        labels: {
          maxStaggerLines: 2,
        },
        tickPositions: [0, 100000, 200000, 300000],
        gridLineWidth: 0,
      },
      legend: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        itemStyle: {
          color: '#E0E0E3',
        },
        itemHoverStyle: {
          color: '#FFF',
        },
        itemHiddenStyle: {
          color: '#606063',
        },
        title: {
          style: {
            color: '#C0C0C0',
          },
        },
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
    };
    const options_5 = {
      title: {
        text: `Daily ${setting.symbol} Frozen(14 Days)`,
        align: 'left',
        x: 0,
        style: {
          color: '#fff',
          fontSize: '14px',
          // backgroundColor: '#313131',
        },
      },
      chart: {
        // height: 200,
        backgroundColor: '#313131',
      },
      series: [
        {
          name: 'Main Chain',
          color: '#45BF55',
          endColumn: 300000,
          data: [
            43934, 52503, 57177, 69658, 97031, 119931, 137133, 276000, 43934,
            52503, 57177, 69658, 97031, 119931,
          ],
          pointStart: d.setDate(d.getDate() - 14),
          pointInterval: 24 * 36e5,
        },
      ],
      xAxis: {
        type: 'datetime',
        labels: {
          // format: '{value: %b. %y}',
        },
      },
      yAxis: {
        softMax: 10,
        title: {
          text: '',
        },
        labels: {
          maxStaggerLines: 2,
        },
        tickPositions: [0, 100000, 200000, 300000],
        gridLineWidth: 0,
      },
      legend: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        itemStyle: {
          color: '#E0E0E3',
        },
        itemHoverStyle: {
          color: '#FFF',
        },
        itemHiddenStyle: {
          color: '#606063',
        },
        title: {
          style: {
            color: '#C0C0C0',
          },
        },
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
    };
    return (
      <>
        <div className="container">
          <InforMarket />
          <div className="trxgroup-wrapper">
            <Row gutter={[8, 16]} type="flex">
              <Col lg={8} xs={24}>
                <MarketVolume />
              </Col>
              <Col lg={16} xs={24}>
                <div className="trxgroup-wrapper-card">
                  <HighchartsReact highcharts={Highcharts} options={options} />
                </div>
              </Col>
            </Row>
            <Row gutter={[8, 16]} type="flex">
              <Col lg={12} xs={24}>
                <Blocks />
              </Col>
              <Col lg={12} xs={24}>
                <Transactions />
              </Col>
            </Row>
            <Row gutter={[8, 16]}>
              <Col lg={12} xs={24}>
                <div className="card">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={options_2}
                  />
                </div>
              </Col>
              <Col lg={12} xs={24}>
                <div className="card">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={options_3}
                  />
                </div>
              </Col>
              <Col lg={12} xs={24}>
                <div className="card">
                  <div>
                    <span className="select-resource">
                      <Select
                        defaultValue="energy"
                        // style={{ width: 120 }}
                        // onChange={handleChange}
                      >
                        <Option value="energy">Energy</Option>
                        <Option value="bandwidth">Bandwidth</Option>
                      </Select>
                    </span>
                    <div>
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={options_4}
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={12} xs={24}>
                <div className="card">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={options_5}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </>
    );
  }
}

export const Home = connector(Screen);
