import {
  Select,
  Row,
  Col,
  Steps,
  Button,
  message,
  Typography,
  Result,
} from 'antd';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
import { txAction } from '../../redux/transaction';
import { TokenType } from '../../components/TokenType';
import { Link, withRouter } from 'react-router-dom';
import { ContractInformation } from './Components/ContractInformation';
import { ConfirmInformation } from './Components/ConfirmInformation';

const { Title } = Typography;
const { Step } = Steps;
const { Option } = Select;
const mapStateToProps = (state: RootState) => ({
  user: state.user,
  wallet: state.wallet,
  transaction: state.transaction,
});
const mapDispatchToProps = {
  changeFields: txAction.changeFields,
  issueToken: txAction.issueToken,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class Screen extends React.Component<PropsFromRedux, any> {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render(): JSX.Element {
    const { current } = this.state;
    const steps = [
      {
        title: 'Select Type',
        content: (
          <Row gutter={[8, 16]}>
            <Col span={24}>
              <Title level={4} style={{ color: '#fff' }}>
                Please select token type
              </Title>
            </Col>
            <Col span={8} xs={24} md={8}>
              <TokenType title="TRC20" active>
                TRC20 token is issued by smart contract, so make sure you have
                finished <a href="#">Deploy Smart Contract</a> . Each account
                may enter mutiple TRC20 tokens.
              </TokenType>
            </Col>
            <Col span={8} xs={24} md={8}>
              <TokenType title="TRC721">
                TRC721 token is issued by smart contract, so make sure you have
                finished Deploy Smart Contract . Each account may enter mutiple
                TRC721 tokens.
              </TokenType>
            </Col>
            <Col span={8} xs={24} md={8}>
              <TokenType title="TRC10">
                TRC10 token is issued by smart contract, so make sure you have
                finished Deploy Smart Contract . Each account may enter mutiple
                TRC10 tokens.
              </TokenType>
            </Col>
          </Row>
        ),
      },
      {
        title: 'Record Information',
        content: <ContractInformation />,
      },
      {
        title: 'Confirm Information',
        content: <ConfirmInformation />,
      },
      {
        title: 'View Result',
        content: (
          <Result
            status="success"
            title="Token recorded successfully "
            subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
          />
        ),
      },
    ];
    return (
      <>
        <div className="tokenRecord">
          <div className="container">
            <Steps current={current}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action text-center">
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => this.next()}>
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={() => message.success('Processing complete!')}
                >
                  Done
                </Button>
              )}
              {current > 0 && (
                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                  Previous
                </Button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export const TokenRecord = connector(Screen);
