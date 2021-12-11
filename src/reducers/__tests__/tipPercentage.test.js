import { describe, expect, test } from '@jest/globals';
import reducer from '../tipPercentage';

describe('total percentage reducer tests', () => {
  test('Valid percent update', () => {
    expect(reducer(15.0, { type: 'TIP_PERCENTAGE/AUTO_UPDATE', text: "20.0" })).toEqual("20.0");
  });

  test('InValid percentage string', () => {
    expect(reducer(15.0, { type: 'TIP_PERCENTAGE/AUTO_UPDATE', text: "--20.0" })).toEqual(15.0);
  });
})