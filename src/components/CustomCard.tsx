import React from 'react';
import { Row, Typography } from 'antd';
const { Title } = Typography;

type PropsType = {
  title: string;
  children?: string | JSX.Element | JSX.Element[];
  contentProps?: any;
  contentStyle?: React.CSSProperties;
  cardStyle?: React.CSSProperties;
};
export const CustomCard: React.FC<PropsType> = (props: PropsType) => {
  return (
    <div
      className="card-balance"
      style={{
        ...props.cardStyle,
      }}
    >
      <div className="balance-header">
        <div className="balance-header-title">
          <h3 className="title">{props.title}</h3>
        </div>
      </div>
      <Row
        justify="center"
        align="middle"
        type="flex"
        style={{
          // minHeight: '10rem',
          ...props.contentStyle,
        }}
        {...props.contentProps}
      >
        {typeof props.children == 'string' ? (
          <Title level={4}>{props.children}</Title>
        ) : (
          props.children
        )}
      </Row>
    </div>
  );
};
