export enum QrCodeType {
  paymentCode = 'payment-code',
}

export const QrCodeProtocol = {
  [QrCodeType.paymentCode]: 'amasstore-payment://',
};

function getQrCode(type: QrCodeType, text: string): string {
  let protocol = '';
  if (QrCodeProtocol[type]) {
    protocol = QrCodeProtocol[type];
  }
  return protocol + text;
}

function getData(qrCode: string): { type: QrCodeType | null; text: string } {
  const protocol = QrCodeProtocol[QrCodeType.paymentCode];
  if (qrCode.startsWith(protocol)) {
    return {
      type: QrCodeType.paymentCode,
      text: qrCode.replace(protocol, ''),
    };
  }
  return {
    type: null,
    text: qrCode,
  };
}

export const qrCodeUtils = {
  getData,
  getQrCode,
  QrCodeProtocol,
  QrCodeType,
};
