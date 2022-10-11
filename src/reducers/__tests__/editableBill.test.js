import { describe, expect, test, beforeEach } from '@jest/globals';
import reducer from '../editableBill';

describe('editableBill reducer tests', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      autoShareAmount: "10.00",
      shares: [
        {
          isManual: false,
          shareAmountText: '5.00'
        },
        {
          isManual: false,
          shareAmountText: '5.00'
        }
      ]
    }
  })



  test('Basic Validation', () => {
    expect(reducer(initialState, {
      type: 'editableBill/VALIDATE',
      data: initialState
    })).toBe(false);
  });

  describe('UPDATE case tests', () => {
    test('all shares are auto will return true', () => {
      expect(reducer(initialState, {
        type: 'editableBill/UPDATE',
        data: initialState
      })).toBe(true);
    });



    test('one mnaual shares results in a return val of false', () => {
      initialState.shares[2] =
      {
        isManual: true,
        shareAmountText: '15.00'
      }

      expect(reducer(initialState, {
        type: 'editableBill/UPDATE',
        data: initialState
      })).toBe(false);
    });

  })
});