import { describe, expect, test, beforeEach } from '@jest/globals';
import reducer from '../preTipTotal';

describe('preTipTotal reducer tests', () => {
    let priorState,
    actionType,
    actionText,
    action;

  beforeEach(() => {
    priorState = 100.00;
    actionType = "preTipTotal/UPDATE_FROM_BILL_TOTAL_CHANGE";
    actionText = {
      preTipTotalNum: 90.0,
      tipPercentage: 16.0
    }
    action = { text: actionText, type: actionType };

  });
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

  test('null billTotalNum returns prior state', () => {

      expect(reducer(priorState, action)).toBe(100.00);

    });

  test('tip percentage undefined', () => {
    actionText.billTotalNum = 100.00;
    actionText.tipPercentage = undefined;
    action.text = actionText;
    expect(reducer(priorState, action)).toBe("86.96");
  });

   test('tip percentage defined', () => {
    actionText.billTotalNum = 100.00;
    actionText.tipPercentage = 18.0;
    action.text = actionText;
    expect(reducer(priorState, action)).toBe("84.75");
  });

})