/* eslint-disable @typescript-eslint/no-inferrable-types */
import Big from 'big.js';
Big.NE = -18;
Big.PE = 40;

function unitLte(a: string, b: string = '0') {
  return new Big(a).lte(new Big(b));
}
function unitLt(a: string, b: string = '0') {
  return new Big(a).lt(new Big(b));
}
function unitAdd(accumulator: string, unit: string = '0') {
  const temp1 = new Big(accumulator);
  const temp2 = new Big(unit);
  return temp1.add(temp2).toString();
}
function unitSubtract(accumulator: string, unit: string = '0') {
  const temp1 = new Big(accumulator);
  const temp2 = new Big(unit);
  return temp1.minus(temp2).toString();
}
function unitMultiply(accumulator: string, unit: string = '0') {
  const temp1 = new Big(accumulator);
  const temp2 = new Big(unit);
  return temp1.mul(temp2).toString();
}
function toSmallestUnit(data: string, decimals: number) {
  const big = new Big(data);
  return big.mul(new Big(10).pow(decimals)).toString();
}
function fromSmallestUnit(data: string, decimals: number) {
  const big = new Big(data);
  return big.div(new Big(10).pow(decimals)).toString();
}
function minUnit(a: string, b: string) {
  return unitLte(a, b) ? a : b;
}
function getMinUnit(params: string[]) {
  let min = '0';
  for (let i = 0; i < params.length - 1; i++) {
    min = minUnit(params[i], params[i + 1]);
  }
  return min;
}
function getQuoteFromBaseAmount(input: {
  baseAmount: string;
  baseDecimals: number;
  quoteDecimals: number;
  rate: number;
}) {
  const { baseAmount, baseDecimals, quoteDecimals, rate } = input;
  const base = fromSmallestUnit(baseAmount, baseDecimals);
  const quote = unitMultiply(base, `${rate}`);
  return toSmallestUnit(quote, quoteDecimals);
}
function getBaseFromQuoteAmount(input: {
  quoteAmount: string;
  quoteDecimals: number;
  baseDecimals: number;
  rate: number;
}) {
  const { quoteAmount, baseDecimals, quoteDecimals, rate } = input;
  const quote = fromSmallestUnit(quoteAmount, quoteDecimals);
  const base = unitMultiply(quote, `${1 / rate}`);
  return toSmallestUnit(base, baseDecimals);
}

export {
  unitLte,
  unitLt,
  unitAdd,
  unitSubtract,
  unitMultiply,
  toSmallestUnit,
  fromSmallestUnit,
  minUnit,
  getMinUnit,
  getQuoteFromBaseAmount,
  getBaseFromQuoteAmount,
};
