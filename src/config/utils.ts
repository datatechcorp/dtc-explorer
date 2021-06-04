import Sdk from 'dtc-node-sdk';
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

export { sdk, usePrevious, delay, removeSpace };
