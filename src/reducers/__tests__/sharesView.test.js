import { describe, expect, test, beforeEach } from '@jest/globals';
import reducer from '../sharesView';

describe('sharesView reducer tests', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      autoShareAmount: "0.00",
      shares: [
        {
          isManual: false,
          shareAmount: null
        }
      ]
    }
  })

  test('Only one share', () => {
    expect(
      reducer(initialState,
        {
          type: 'sharesView/updateAutoShareAmount',
          data: {
            preTipTotal: '100.00',
            tipPercentage: '15.0'
          }
        })
    )
      .toBe(initialState);
  });

  test('add a share', () => {
    expect(
      reducer(initialState,
        {
          type: 'sharesView/addShare',
          data: {
            totalBill: '150.00'
          }
        }).autoShareAmount
    )
      .toBe("75.00")
  })

  test('state with manual share', () => {
    initialState.shares[1] = {
      isManual: false,
      shareAmount: null
    }
    initialState.shares[2] = {
      isManual: true,
      shareAmount: "25.00"
    }
    expect(
      reducer(initialState,
        {
          type: 'sharesView/updateAutoShareAmount',
          data: {
            preTipTotal: '100.00',
            tipPercentage: '15.0'
          }
        }).autoShareAmount)
      .toBe("45.00");
  })
  /*
    test('increment manual share', () => {
      initialState.shares[0].shareAmount = "191.67"
      initialState.shares[1] = {
        isManual: false,
        shareAmount: "191.67"
      }
      initialState.shares[2] = {
        isManual: false,
        shareAmount: "191.67"
      }
      expect(
        reducer(initialState,
          {
            type: 'sharesView/incrementManualShare',
            data: {
              preTipTotal: '500.00',
              tipPercentage: '15.0',
              shareIndex: 0,
              changeAmount: 1
            }
          }).autoShareAmount)
        .toBe("191.17");
    })
    */
})