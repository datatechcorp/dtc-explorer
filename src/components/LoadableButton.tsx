import React from 'react';
import { Spin, Icon, Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

const antIcon = (
  <Icon type="loading" style={{ fontSize: 20, marginRight: 16 }} spin />
);

interface PropsType extends ButtonProps {
  isFetching?: boolean;
  children?: any;
}

export const LoadableButton: React.FC<PropsType> = (props: PropsType) => {
  const { isFetching, children, ...rest } = props;
  return (
    <Button disabled={isFetching} {...rest}>
      {isFetching && <Spin indicator={antIcon} />}
      {children}
    </Button>
  );
};
