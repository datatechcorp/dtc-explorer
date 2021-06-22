import { Col, DatePicker, Form, Icon, Input, Row, Select, Upload } from 'antd';
import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../redux';
import { fileApi } from '../../../redux/file';
import { UploadType } from '../../../redux/file/file.enterface';
import { CardToken } from '../../../components/CardToken';

const { Option } = Select;
const { TextArea } = Input;

const mapStateToProps = (state: RootState): any => ({
  user: state.user,
  wallet: state.wallet,
  setting: state.setting,
});
const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class Screen extends React.Component<PropsFromRedux, any> {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };
  constructor(props) {
    super(props);
  }
  onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };
  changeFile = (type: 'images' | 'thumbnail', event): void => {
    const images = event.fileList
      .filter((item) => item.status === 'done' && item.url)
      .map((item) => item.url);
    // this.changeField('images', images);
  };

  uploadFile = (type: 'images' | 'thumbnail', event): void => {
    const form = new FormData();
    form.append('files', event.file);
    fileApi
      .updateFiles(
        form,
        type === 'images'
          ? UploadType.ProductImage
          : UploadType.ProductThumbnail,
      )
      .then((response) => {
        if (response && response.code === 200 && response.data.length > 0) {
          if (type === 'images') {
            // this.changeField('images', [
            //   ...this.props.form.images,
            //   ...response.data,
            // ]);
          } else {
            // this.changeField('thumbnail', response.data[0]);
          }
        } else {
          // notification.error('Upload file error!');
        }
      });
  };
  render(): JSX.Element {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
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
                    <Form.Item label="Contract Address *">
                      <Input
                        type="text"
                        placeholder="Address of the contract for creating the token"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Contract Name">
                      <Input type="text" placeholder="Contract Name" disabled />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Contract creation date *">
                      <DatePicker
                        onChange={this.onChangeDate}
                        placeholder="Contract creation date"
                        style={{ width: '100%' }}
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Contract creator">
                      <Input
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
                    <Form.Item label="Token name *">
                      <Input
                        type="text"
                        placeholder="2-30 characters for token name"
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Token abbreviation *">
                      <Input
                        type="text"
                        placeholder="2-10 characters for token abbreviation"
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Token introduction *">
                      <TextArea
                        placeholder="Brief description of the purpose of the token, not exceeding 200 characters"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Total Supply *">
                      <Input
                        type="text"
                        placeholder="Total token issuance(without precision)"
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Precision *">
                      <Input type="text" placeholder="1-18" disabled />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Issuer *">
                      <Input
                        type="text"
                        value="TSQNwvocG78iijtuwmy566KKgffbTJptpK"
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Token logo">
                      <Upload
                        name="files"
                        listType="picture-card"
                        // className="avatar-uploader"
                        showUploadList={false}
                        customRequest={(event): void =>
                          this.uploadFile('thumbnail', event)
                        }
                        // onChange={(event): void =>
                        //   this.changeFile('thumbnail', event)
                        // }
                      >
                        {/* {form.thumbnail ? (
                          <img
                            src={form.thumbnail}
                            alt="avatar"
                            style={{ width: '100%' }}
                          />
                        ) : (
                          uploadButton
                        )} */}
                        {uploadButton}
                      </Upload>
                      <div className="ant-form-explain">
                        Support format: png，jpg，jpeg; Size limit: No more than
                        200K; Pixel limit: 100*100 pixels
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
                    <Form.Item label="Project offical website *">
                      <Input
                        type="text"
                        placeholder="Project offical website"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Email *">
                      <Input type="text" placeholder="Contact email" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Link for GitHub">
                      <Input type="text" placeholder="Link for GitHub" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Link for white paper">
                      <Input type="text" placeholder="Link for white paper" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <span>
                          <FaFacebook /> Facebook
                        </span>
                      }
                    >
                      <Input type="text" placeholder="Link for facebook" />
                    </Form.Item>
                  </Col>
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
