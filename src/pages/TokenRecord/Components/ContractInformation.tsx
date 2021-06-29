import { Col, Form, Icon, Input, Row, Upload } from 'antd';
import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { connect, ConnectedProps } from 'react-redux';
import DtcSdk from 'dtc-node-sdk';
import { RootState } from '../../../redux';
import { fileApi } from '../../../redux/file';
import { CardToken } from '../../../components/CardToken';
import logos from '../../../static/social_media_logos.json';
import { txAction } from '../../../redux/transaction';
import { notification } from '../../../utils/notification';
import { setting } from '../../../config/setting';

const { TextArea } = Input;

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  tx: state.transaction,
});
const mapDispatchToProps = {
  changeFields: txAction.changeFields,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
const platformArr = Object.keys(logos);
type PlatformType = typeof platformArr[number];
const tknParams = ['name', 'symbol', 'decimals', 'totalSupply'];
type TknParamType = typeof tknParams[number];
interface State
  extends Record<PlatformType, string>,
    Record<TknParamType, string> {
  contrCreator: string;
}

class Screen extends React.Component<PropsFromRedux, Partial<State>> {
  constructor(props) {
    super(props);
    const payload: Record<PlatformType, string> & Record<TknParamType, string> =
      {};
    Object.keys(logos).forEach((logo) => {
      payload[logo] = '';
    });
    tknParams.forEach((param) => {
      payload[param] = '';
    });
    this.state = {
      contrCreator: '',
      name: '',
      symbol: '',
      totalSupply: '',
      ...payload,
    };
  }
  sdk: any;

  checkContr = async () => {
    try {
      const {
        user: { key },
        tx: {
          recordContrForm: { contrAddress },
        },
        changeFields,
      } = this.props;
      if (!this.sdk) {
        const { fullNodeHost, solidityHost, eventHost } = setting;
        this.sdk = new DtcSdk(fullNodeHost, solidityHost, eventHost, key);
      }
      if (this.sdk.isAddress(contrAddress)) {
        const deployedContr = await this.sdk.contract().at(contrAddress);
        const result = await Promise.all(
          tknParams.map((method) => deployedContr[method].call()),
        );
        const newState: Partial<State> = {
          contrCreator: deployedContr.originAddress,
        };
        tknParams.forEach((el, i) => {
          newState[el] = result[i];
        });
        this.setState({ ...newState });
        const hexMessage = this.sdk.toHex(
          contrAddress + deployedContr.originAddress,
        );
        const signature = await this.sdk.dtc.sign(hexMessage);
        changeFields({
          'recordContrForm.signature': signature,
        });
      }
    } catch (error) {
      if (error && typeof error == 'string') {
        notification.error(error);
      }
    }
  };

  clearTknParams = () => {
    if (!this.state[tknParams[0]]) {
      const newState: Partial<State> = {};
      tknParams.forEach((el) => {
        newState[el] = '';
      });
      this.setState({ ...newState });
    }
  };

  changeFieldWithErr = (fieldname: string, value: any) => {
    this.props.changeFields({
      [`recordContrForm.${fieldname}`]: value,
      [`recordContrForm.${fieldname}Err`]: '',
    });
  };

  uploadFile = (event) => {
    const form = new FormData();
    const file = event.file;
    const image = new File([file], 'drc20.contract', {
      type: file.type,
      lastModified: file.lastModified,
    });
    if (image.size > 200 * 1024) {
      notification.error('Logo size is more than 200KB');
      return;
    }
    form.append('image', image);
    fileApi.updateFile(form).then((response) => {
      if (response) {
        if (typeof response === 'string') {
          this.changeFieldWithErr('tknLogo', response);
        } else {
          notification.error(response.message);
        }
        return;
      }
      notification.error('Please check your network');
    });
  };

  render(): JSX.Element {
    const {
      contrCreator,
      name,
      symbol,
      totalSupply,
      decimals,
      ...restPlatforms
    } = this.state;
    const {
      user: { walletAddress },
      tx: {
        recordContrForm: {
          tknLogo,
          tknLogoErr,
          contrAddress,
          contrAddressErr,
          tknDescriptions,
          tknDescriptionsErr,
          email,
          emailErr,
          oflWebsite,
          oflWebsiteErr,
          github,
          links,
          whitepaper,
        },
      },
    } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <>
        <Row gutter={[16, 32]}>
          <Col span={24}>
            <CardToken title="Contract Information">
              <Form className="card-token-form">
                <Row gutter={[16, 32]} type="flex" justify="center">
                  <Col span={12}>
                    <Form.Item
                      label="Contract Address *"
                      validateStatus={contrAddressErr ? 'error' : 'success'}
                      help={contrAddressErr}
                    >
                      <Input
                        value={contrAddress}
                        type="text"
                        placeholder="Address of the contract for creating the token"
                        onChange={(e) => {
                          this.changeFieldWithErr(
                            'contrAddress',
                            e.target.value,
                          );
                          this.clearTknParams();
                          this.checkContr();
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Contract creator">
                      <Input
                        value={contrCreator}
                        type="text"
                        placeholder="Contract creator"
                        disabled
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </CardToken>
          </Col>
          <Col span={24}>
            <CardToken title="Basic Information">
              <Form className="card-token-form">
                <Row gutter={[16, 32]} type="flex">
                  <Col span={12}>
                    <Form.Item label="Token name">
                      <Input
                        value={name}
                        type="text"
                        placeholder="2-30 characters for token name"
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Token symbol">
                      <Input
                        value={symbol}
                        type="text"
                        placeholder="2-10 characters for token abbreviation"
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Token introduction *"
                      validateStatus={tknDescriptionsErr ? 'error' : 'success'}
                      help={tknDescriptionsErr}
                    >
                      <TextArea
                        value={tknDescriptions}
                        placeholder="Brief description of the purpose of the token, not exceeding 200 characters"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                        onChange={(e) =>
                          this.changeFieldWithErr(
                            'tknDescriptions',
                            e.target.value,
                          )
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Total Supply">
                      <Input
                        value={totalSupply}
                        type="text"
                        placeholder="Total token issuance(without precision)"
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Token decimals">
                      <Input
                        value={decimals}
                        type="text"
                        placeholder="1-18"
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Issuer">
                      <Input type="text" value={walletAddress} disabled />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Token logo *"
                      validateStatus={tknLogoErr ? 'error' : 'success'}
                      help={tknLogoErr}
                    >
                      <Upload
                        accept="image/jpeg,image/jpg,image/png"
                        name="files"
                        listType="picture-card"
                        showUploadList={false}
                        customRequest={this.uploadFile}
                      >
                        {tknLogo ? (
                          <img
                            src={setting.imageHost + tknLogo}
                            alt="avatar"
                            style={{ width: '100%' }}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                      <div className="ant-form-explain">
                        Support format: png，jpg，jpeg; Size limit: No more than
                        200KB; Pixel limit: 100*100 pixels
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </CardToken>
          </Col>
          <Col span={24}>
            <CardToken title="Social Media Information">
              <Form className="card-token-form">
                <Row gutter={[16, 32]} type="flex">
                  <Col span={12}>
                    <Form.Item
                      label="Project official website *"
                      validateStatus={oflWebsiteErr ? 'error' : 'success'}
                      help={oflWebsiteErr}
                    >
                      <Input
                        type="text"
                        placeholder="Project official website"
                        value={oflWebsite}
                        onChange={(e) =>
                          this.changeFieldWithErr('oflWebsite', e.target.value)
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Email *"
                      validateStatus={emailErr ? 'error' : 'success'}
                      help={emailErr}
                    >
                      <Input
                        type="text"
                        placeholder="Contact email"
                        value={email}
                        onChange={(e) =>
                          this.changeFieldWithErr('email', e.target.value)
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Link for GitHub">
                      <Input
                        type="text"
                        placeholder="Link for GitHub"
                        value={github}
                        onChange={(e) =>
                          this.changeFieldWithErr('github', e.target.value)
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Link for white paper">
                      <Input
                        type="text"
                        placeholder="Link for white paper"
                        value={whitepaper}
                        onChange={(e) =>
                          this.changeFieldWithErr('whitepaper', e.target.value)
                        }
                      />
                    </Form.Item>
                  </Col>
                  {/* <Col span={12}>
                    <Form.Item
                      label={
                        <span>
                          <FaFacebook /> Facebook
                        </span>
                      }
                    >
                      <Input type="text" placeholder="Link for facebook" />
                    </Form.Item>
                  </Col> */}
                </Row>
              </Form>
            </CardToken>
          </Col>
        </Row>
      </>
    );
  }
}

export const ContractInformation = connector(Screen);
