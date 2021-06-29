import { Col, Form, Input, Row, Switch, Select, Checkbox, Button } from 'antd';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { CardToken } from '../../components/CardToken';
import { RootState } from '../../redux';
import { TokenType, txAction } from '../../redux/transaction';
import { removeSpace } from '../../config/utils';
import { setting } from '../../config/setting';

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
  onDontShowAgain: () => any;
  constructor(props) {
    super(props);

    this.state = { showReceiveModal: false };
  }
  showReceiveModal = () => {
    this.setState({
      showReceiveModal: true,
    });
  };
  issueToken = () => this.props.issueToken();

  render(): JSX.Element {
    const network = [
      {
        value: 'mainnet',
        title: 'Main DataTechCorp Network',
      },
      {
        value: 'development',
        title: 'Private Test Network',
      },
    ];
    // const transaction = [
    //   {
    //     title: 'Commission Fee',
    //     description:
    //       'Commission will be transferred directly to us through the Ethereum network as part of your payment. Commission will support ERC20 Token Generator to keep it safe, running and constantly updated.',
    //     value: '0 ETH',
    //   },
    //   {
    //     title: 'Gas Fee',
    //     description: `It depends on Gas Limit and on current Gas price average. MetaMask will suggest both. Do not decrease Gas Limit to avoid transaction to fail. If you want, you can decrease Gas Price but your transaction could remain pending for minutes/hours. Read how to calculate right value in our FAQ. Failed transaction can't be refunded`,
    //     value: '0 ETH',
    //   },
    // ];
    const {
      transaction: {
        issueTokenForm: {
          name,
          symbol,
          decimals,
          totalSupply,
          agree,
          tokenType,
          description,
          ratio,
          url,
        },
        fetching,
      },
      changeFields,
    } = this.props;
    return (
      <>
        <div className="accountProperty">
          <div className="container">
            <Row gutter={[8, 16]}>
              <Col span={8} xs={24} md={8}>
                <CardToken title="Token Details">
                  <Form className="card-token-form">
                    <Row gutter={[16, 16]} type="flex" justify="center">
                      <Col span={24}>
                        {tokenType === setting.tokenTypes[0] && (
                          <div className="ant-form-explain">
                            DRC10 Token is native solution for an Initial Coin
                            Offering (ICO). Only one token can be created per
                            account/address. The ICO Sale will end after 30 days
                            from the creation time (next 1 hour).
                          </div>
                        )}
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          label="Token Name *"
                          // validateStatus={
                          //   authForm.usernameOrEmailError ? 'error' : 'success'
                          // }
                          // help={authForm.usernameOrEmailError}
                        >
                          <Input
                            type="text"
                            placeholder="Your token name"
                            value={name}
                            onChange={(e) => {
                              changeFields({
                                'issueTokenForm.name': e.target.value,
                              });
                            }}
                          />
                          <div className="ant-form-explain">
                            Choose a name for your token.
                          </div>
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item label="Token Symbol *">
                          <Input
                            type="text"
                            placeholder="Your token symbol"
                            value={symbol}
                            onChange={(e) => {
                              changeFields({
                                'issueTokenForm.symbol': removeSpace(
                                  e.target.value,
                                ),
                              });
                            }}
                          />
                          <div className="ant-form-explain">
                            Choose a symbol for your token (usually 3-5 chars).
                          </div>
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item label="Token decimals *">
                          <Input
                            disabled={tokenType === setting.tokenTypes[0]}
                            type="number"
                            value={
                              tokenType === setting.tokenTypes[0] ? 6 : decimals
                            }
                            min={1}
                            onChange={(e) => {
                              let val = e.target.value;
                              if (val) {
                                const regex = /^\d+$/;
                                if (!regex.test(val)) {
                                  return;
                                }
                                if (val[0] === '0') {
                                  val = val.slice(1);
                                }
                              }
                              changeFields({
                                'issueTokenForm.decimals': parseInt(val),
                              });
                            }}
                          />
                          <div className="ant-form-explain">
                            {`Insert the decimal precision of your token. If you
                            don't know what to insert, use 6.`}
                          </div>
                        </Form.Item>
                      </Col>
                      {/* <Col span={24}>
                        <Form.Item label="Initial Supply *">
                          <Input
                            type="number"
                            placeholder="Your token initial supply"
                          />
                          <div className="ant-form-explain">
                            Insert the initial number of tokens available. Will
                            be put in your account.
                          </div>
                        </Form.Item>
                      </Col> */}
                      <Col span={24}>
                        <Form.Item label="Total Supply *">
                          <Input
                            type="number"
                            placeholder="Your token max supply"
                            value={totalSupply}
                            min={1}
                            onChange={(e) => {
                              let val = e.target.value;
                              if (val) {
                                const regex = /^\d+$/;
                                if (!regex.test(val)) {
                                  return;
                                }
                                if (val[0] === '0') {
                                  val = val.slice(1);
                                }
                              }
                              changeFields({
                                'issueTokenForm.totalSupply': val,
                              });
                            }}
                          />
                          <div className="ant-form-explain">
                            Insert the maximum number of tokens available.
                          </div>
                        </Form.Item>
                      </Col>
                      {tokenType === setting.tokenTypes[0] && (
                        <>
                          <Col span={24}>
                            <Form.Item label="Token Description">
                              <Input
                                type="text"
                                placeholder="Description..."
                                value={description}
                                onChange={(e) => {
                                  changeFields({
                                    'issueTokenForm.description':
                                      e.target.value,
                                  });
                                }}
                              />
                              <div className="ant-form-explain">
                                Description about your token
                              </div>
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <Form.Item label="Token URL">
                              <Input
                                type="text"
                                placeholder="URL"
                                value={url}
                                onChange={(e) => {
                                  changeFields({
                                    'issueTokenForm.url': e.target.value,
                                  });
                                }}
                              />
                              <div className="ant-form-explain">
                                Your project homepage
                              </div>
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <Form.Item label="Token Ratio *">
                              <Input
                                type="number"
                                placeholder="Token ratio"
                                value={ratio}
                                min={1}
                                onChange={(e) => {
                                  let val = e.target.value;
                                  if (val) {
                                    const regex = /^\d+$/;
                                    if (!regex.test(val)) {
                                      return;
                                    }
                                    if (val[0] === '0') {
                                      val = val.slice(1);
                                    }
                                  }
                                  changeFields({
                                    'issueTokenForm.ratio': parseInt(val),
                                  });
                                }}
                              />
                              <div className="ant-form-explain">
                                1 DTC = {ratio} token
                              </div>
                            </Form.Item>
                          </Col>
                        </>
                      )}
                    </Row>
                  </Form>
                </CardToken>
              </Col>
              <Col span={8} xs={24} md={8}>
                <CardToken title="Token Features">
                  <Form className="card-token-form">
                    <Row gutter={[8, 8]} type="flex" justify="center">
                      <Col span={24}>
                        <Form.Item label="Supply Type">
                          <Select
                            defaultValue="fixed"
                            // onChange={this.handleChange}
                            disabled
                          >
                            <Option value="fixed">Fixed</Option>
                            <Option value="unlimited">Unlimited</Option>
                            <Option value="capped">Capped</Option>
                          </Select>
                          <div className="ant-form-explain">
                            Fixed, Unlimited, Capped
                          </div>
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item label="Access Type">
                          <Select
                            defaultValue="none"
                            // onChange={this.handleChange}
                            disabled
                          >
                            <Option value="none">None</Option>
                            <Option value="ownable">Ownable</Option>
                            <Option value="roleBased">Role Based</Option>
                          </Select>
                          <div className="ant-form-explain">
                            None, Ownable, Role Based
                          </div>
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item label="Transfer Type">
                          <Select
                            defaultValue="unstoppable"
                            // onChange={this.handleChange}
                            disabled
                          >
                            <Option value="unstoppable">Unstoppable</Option>
                            <Option value="pausable">Pausable</Option>
                          </Select>
                          <div className="ant-form-explain">
                            Unstoppable, Pausable
                          </div>
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <div className="d-flex align-items-center">
                          <Switch
                            size="small"
                            style={{ marginRight: 8 }}
                            defaultChecked
                            disabled
                          />{' '}
                          Verified Source Code
                        </div>
                        <div className="ant-form-explain">
                          Your Token Source Code will be automatically verified
                          on DTCScan.
                        </div>
                      </Col>
                      {/* <Col span={24}>
                        <div className="d-flex align-items-center">
                          <Switch
                            size="small"
                            style={{ marginRight: 8 }}
                            disabled
                          />{' '}
                          Remove Copyright
                        </div>
                        <div className="ant-form-explain">
                          Remove the link pointing to this page from your
                          contract.
                        </div>
                      </Col>
                      <Col span={24}>
                        <div className="d-flex align-items-center">
                          <Switch
                            size="small"
                            style={{ marginRight: 8 }}
                            disabled
                          />{' '}
                          Burnable
                        </div>
                      </Col>
                      <Col span={24}>
                        <div className="d-flex align-items-center">
                          <Switch
                            size="small"
                            style={{ marginRight: 8 }}
                            disabled
                          />{' '}
                          Mintable
                        </div>
                      </Col> */}
                      {/* <Col span={24}>
                        <div className="d-flex align-items-center">
                          <Switch
                            size="small"
                            style={{ marginRight: 8 }}
                            disabled
                          />{' '}
                          ERC1363
                        </div>
                      </Col>
                      <Col span={24}>
                        <div className="d-flex align-items-center">
                          <Switch
                            size="small"
                            style={{ marginRight: 8 }}
                            disabled
                          />{' '}
                          Token Recover
                        </div>
                      </Col> */}
                    </Row>
                  </Form>
                </CardToken>
              </Col>
              <Col span={8} xs={24} md={8}>
                <CardToken title="Token Type and Network">
                  <Form className="card-token-form">
                    <Row gutter={[8, 8]} type="flex" justify="center">
                      <Col span={24}>
                        <Form.Item label="Token Type *">
                          <Select
                            defaultValue={setting.tokenTypes[1]}
                            onSelect={(value: TokenType) => {
                              changeFields({
                                'issueTokenForm.tokenType': value,
                              });
                            }}
                          >
                            {setting.tokenTypes.map((item) => (
                              <Option key={item} value={item}>
                                {item}
                              </Option>
                            ))}
                          </Select>
                          <div className="ant-form-explain">
                            Choose your Token Type.
                          </div>
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item label="Network *">
                          <Select
                            defaultValue={network[1].value}
                            // onChange={this.handleChange}
                            disabled
                          >
                            {network.map((item) => (
                              <Option key={item.value} value={item.value}>
                                {item.title}
                              </Option>
                            ))}
                          </Select>
                          <div className="ant-form-explain">
                            Choose your Network.
                          </div>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </CardToken>
                <CardToken title="Agreement" cardStyle={{ marginTop: 24 }}>
                  <Checkbox
                    checked={agree}
                    onChange={() => {
                      changeFields({ 'issueTokenForm.agree': !agree });
                    }}
                  >
                    {`I have read, understood and agreed to Token
                    Generator's`}{' '}
                    <a href="#">Terms of Use</a>.
                  </Checkbox>
                  {agree ? (
                    <div></div>
                  ) : (
                    <small style={{ color: 'red', marginTop: '12px' }}>
                      The Token Agreement field is required
                    </small>
                  )}
                </CardToken>
                {/* <CardToken
                  title="Transaction"
                  cardStyle={{ marginTop: 24 }}
                  headerStyle={{ backgroundColor: '#17a2b8' }}
                  bodyStyle={{ padding: 0 }}
                >
                  <List
                    style={{ padding: '0 8px' }}
                    dataSource={transaction}
                    renderItem={(item) => (
                      <List.Item className="d-flex align-items-center">
                        <Typography.Text className="align-items-center d-flex">
                          {item.title}{' '}
                          <Tooltip title={item.description}>
                            <BsInfoCircleFill style={{ marginLeft: 8 }} />
                          </Tooltip>
                        </Typography.Text>
                        <Tag color="#87d068">{item.value}</Tag>
                      </List.Item>
                    )}
                  />
                </CardToken> */}
                <Button
                  className="mt-15"
                  type="primary"
                  loading={fetching}
                  onClick={this.issueToken}
                  style={{ width: '100%', minHeight: '56px' }}
                  disabled={
                    !(name && symbol && decimals && totalSupply && agree)
                  }
                >
                  CONFIRM
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </>
    );
  }
}

export const CreateToken = connector(Screen);
