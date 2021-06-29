import { Col, Row } from 'antd';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../redux';

const mapStateToProps = (state: RootState): any => ({
  user: state.user,
  wallet: state.wallet,
});
const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class Screen extends React.Component<PropsFromRedux, any> {
  constructor(props) {
    super(props);
  }
  render(): JSX.Element {
    const basic = [
      {
        title: 'Name of the token',
        content: 'Wendy',
      },
      {
        title: 'Token abbreviation',
        content: 'wendy',
      },
      {
        title: 'Token introduction',
        content: 'WENDY is a Defi program',
      },
      {
        title: 'Total supply',
        content: '10.000.000',
      },
      {
        title: 'Precision',
        content: '18',
      },
      {
        title: 'Issuer',
        content: 'ádasdasdasdasdasdasdasd',
      },
    ];
    const contract = [
      {
        title: 'Contract address',
        content: 'ádasdasdasdasd',
      },
      {
        title: 'Contract creation date',
        content: 'Invalid date',
      },
      {
        title: 'Address contract creator',
        content: '',
      },
    ];
    const media = [
      {
        title: 'Project offical website',
        content: 'wendy.com',
      },
      {
        title: 'Email',
        content: 'email@email.com',
      },
      {
        title: 'Address for the whitepaper',
        content: 'asdasds.com',
      },
      {
        title: 'Github',
        content: 'asdasds.com',
      },
    ];
    return (
      <>
        <div className="confirmInformation">
          <Row gutter={[16, 32]}>
            <Col span={24}>
              <h3 className="title">Basic Information</h3>
            </Col>
            {basic.map((item) => (
              <Col span={12} key={item.title}>
                <span className="titlecontent">{item.title}</span>
                <span className="subcontent">{item.content}</span>
              </Col>
            ))}
          </Row>
          <Row gutter={[16, 32]}>
            <Col span={24}>
              <h3 className="title">Contract Information</h3>
            </Col>
            {contract.map((item) => (
              <Col span={12} key={item.title}>
                <span className="titlecontent">{item.title}</span>
                <span className="subcontent">{item.content}</span>
              </Col>
            ))}
          </Row>
          <Row gutter={[16, 32]}>
            <Col span={24}>
              <h3 className="title">Social media Information</h3>
            </Col>
            {media.map((item) => (
              <Col span={12} key={item.title}>
                <span className="titlecontent">{item.title}</span>
                <span className="subcontent">{item.content}</span>
              </Col>
            ))}
          </Row>
        </div>
      </>
    );
  }
}

export const ConfirmInformation = connector(Screen);
