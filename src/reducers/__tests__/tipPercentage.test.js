import { describe, expect, test } from '@jest/globals';
import reducer from '../tipPercentage';

describe('total percentage reducer tests', () => {
  test('Valid percent update', () => {
    expect(reducer(15.0, { type: 'TIP_PERCENTAGE/AUTO_UPDATE', text: "20.0" })).toEqual("20.0");
  });

  test('InValid percentage string', () => {
    expect(reducer(15.0, { type: 'TIP_PERCENTAGE/AUTO_UPDATE', text: "--20.0" })).toEqual(15.0);
  });

  test('InValid percentage string', () => {
    expect(reducer(15.0, {
      type: 'TIP_PERCENTAGE/BILL_TOTAL_UPDATE', data: {
        billTotalNum: 120.00, preTipTotalNum: 100.00
      }
    })).toEqual("20.0");
  });

  test('preTiptotal less than .20', () => {
    expect(reducer(16.0, {
      type: 'TIP_PERCENTAGE/BILL_TOTAL_UPDATE', data: {
        billTotalNum: 0.25, preTipTotalNum: 0.19
      }
    })).toEqual('15.0');
  });
})