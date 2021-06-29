import Sdk from 'dtc-node-sdk';
import _ from 'lodash';
import { Action, ErrorResponse } from '../redux/common';
import { useEffect, useRef } from 'react';
import { setting } from './setting';

const HttpProvider = Sdk.providers.HttpProvider;
const fullNode = new HttpProvider(setting.fullNodeHost);
const solidityNode = new HttpProvider(setting.solidityHost);
const eventServer = new HttpProvider(setting.eventHost);
const defaultKey =
  '4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8';

const sdk = {
  ins: new Sdk({
    fullNode,
    solidityNode,
    eventServer,
    privateKey: defaultKey,
  }),
  ping(): Promise<boolean> {
    return this.ins.isConnected();
  },
  changeKey(key: string): any {
    this.ins.setPrivateKey(key);
    return this;
  },
};

function errorStack(
  prefix: string,
  dispatch,
  changeFields: (payload: Record<string, any>) => Action,
) {
  const errors: Record<string, string> = {};
  return {
    pushError(fieldname: string, error: string) {
      errors[`${prefix}.${fieldname}Err`] = error;
    },
    hasErrors() {
      if (!_.isEmpty(errors)) {
        dispatch(changeFields({ ...errors, hasErrors: true }));
        return true;
      }
      dispatch(changeFields({ hasErrors: false }));
      return false;
    },
  };
}

function usePrevious<V>(value: V) {
  const ref = useRef<V>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function delay(duration: number) {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve(null);
    }, duration);
  });
}

function removeSpace(str: string) {
  return str.replace(/\s+/g, '');
}

function isErrResponse(object: unknown): object is ErrorResponse {
  return (
    Object.prototype.hasOwnProperty.call(object, 'code') &&
    Object.prototype.hasOwnProperty.call(object, 'message')
  );
}

export { sdk, usePrevious, delay, removeSpace, errorStack, isErrResponse };
