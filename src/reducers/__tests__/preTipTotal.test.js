import { describe, expect, test } from '@jest/globals';
import reducer from '../preTipTotal';

describe('preTipTotal reducer tests', () => {
  test('invalid currency format including letters', () => {
    expect(reducer("100.00", {
      type: 'UPDATE_PRE_TIP_TOTAL',
      text: "abcde"
    }))
      .toEqual("100.00");
  });

  test('No negatives', () => {
    expect(reducer("100.00", {
      type: 'UPDATE_PRE_TIP_TOTAL',
      text: "-50.003"
    }))
      .toEqual("100.00");
  });

  test('Valid format commas and decimals moved', () => {
    expect(reducer("100.00",
      {
        type: 'UPDATE_PRE_TIP_TOTAL',
        text: "10,050.500"
      }))
      .toEqual("100,505.00");
  });

  test('Valid currency format', () => {
    expect(reducer("100.00",
      {
        type: 'UPDATE_PRE_TIP_TOTAL',
        text: "50,000.00"
      }))
      .toEqual("50,000.00");
  });
})