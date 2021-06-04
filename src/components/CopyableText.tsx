import React from 'react';
import { Input, Tooltip, Button, Form } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { notification } from '../utils/notification';

type PropsType = {
  value: string | number;
  label?: string;
  fontSize?: string | number;
  class?: string;
};
export const CopyableText: React.FC<PropsType> = (props: PropsType) => {
  return (
    <>
      {props.label ? (
        <Form.Item className="mb-0" label={props.label}>
          <Input
            value={props.value}
            disabled
            className="disabled_input"
            suffix={
              <CopyToClipboard
                text={props.value}
                //   onCopy={() => this.setState({ copied: true })}
              >
                <Tooltip title="copy">
                  <Button
                    onClick={(): void => {
                      notification.success('Copied');
                    }}
                    icon="copy"
                    type="link"
                    size="small"
                    style={{ borderColor: 'transparent' }}
                  />
                </Tooltip>
              </CopyToClipboard>
            }
          />
        </Form.Item>
      ) : (
        <CopyToClipboard text={props.value}>
          <Tooltip title="copy">
            <Button
              onClick={(): void => {
                notification.success('Copied');
              }}
              icon="copy"
              className={props.class}
              style={{
                color: 'rgba(0,0,0,.45)',
                fontSize: props.fontSize,
                borderColor: 'transparent',
              }}
            />
          </Tooltip>
        </CopyToClipboard>
      )}
    </>
  );
};
