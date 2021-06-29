import { Row, Col, Steps, Button, message, Typography, Result } from 'antd';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
import { txAction, txInitialState } from '../../redux/transaction';
import { TokenType } from '../../components/TokenType';
import { ContractInformation } from './Components/ContractInformation';

const { Title } = Typography;
const { Step } = Steps;

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
          <TokenType title="DRC20">
            DRC20 token is issued by smart contract, so make sure you have
            finished <a href="#">Deploy Smart Contract</a> . Each account may
            enter mutiple DRC20 tokens.
          </TokenType>
        </Col>
        {/* <Col span={8} xs={24} md={8}>
              <TokenType title="DRC721">
                DRC721 token is issued by smart contract, so make sure you have
                finished Deploy Smart Contract . Each account may enter mutiple
                DRC721 tokens.
              </TokenType>
            </Col>
            <Col span={8} xs={24} md={8}>
              <TokenType title="DRC10">
                DRC10 token is issued by smart contract, so make sure you have
                finished Deploy Smart Contract . Each account may enter mutiple
                DRC10 tokens.
              </TokenType>
            </Col> */}
      </Row>
    ),
  },
  {
    title: 'Record Information',
    content: <ContractInformation />,
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

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  wallet: state.wallet,
  transaction: state.transaction,
});
const mapDispatchToProps = {
  changeFields: txAction.changeFields,
  recordToken: txAction.recordToken,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface State {
  current: number;
}

class Screen extends React.Component<PropsFromRedux, State> {
  constructor(props: PropsFromRedux) {
    super(props);
    this.state = {
      current: 0,
    };
    props.changeFields({
      recordContrForm: txInitialState.recordContrForm,
    });
  }
  next = () => {
    const { current } = this.state;
    const { recordToken } = this.props;
    if (current === 1) {
      recordToken().then((success) => {
        if (success) {
          this.setState({ current: current + 1 });
        }
      });
    } else {
      this.setState({ current: current + 1 });
    }
  };

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };
  render(): JSX.Element {
    const { current } = this.state;
    const {
      transaction: { fetching },
    } = this.props;

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
              {current > 0 && (
                <Button style={{ marginRight: 20 }} onClick={this.prev}>
                  Previous
                </Button>
              )}
              {current < steps.length - 1 && (
                <Button loading={fetching} type="primary" onClick={this.next}>
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
            </div>
          </div>
        </div>
      </>
    );
  }
}

export const TokenRecord = connector(Screen);
