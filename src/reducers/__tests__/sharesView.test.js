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
          shareAmountText: null
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
      shareAmountText: null
    }
    initialState.shares[2] = {
      isManual: true,
      shareAmountText: "25.00"
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

  describe('Delete Share', () => {
    test('remove on of two share', () => {
      initialState.shares[1] = {
        isManual: false,
        shareAmountText: null
      };
      expect(
        reducer(initialState,
          {
            type: 'sharesView/deleteShare',
            data: {
              shareIndex: 0,
              totalBill: '115.00'
            }
          }
        ).shares[0].shareAmountText
      ).toBe('115.00');
    }
    );
    test('remove one of three shares, leaving two auto shares', () => {
      initialState.shares[1] = {
        isManual: true,
        shareAmountText: '50.0'
      };
      initialState.shares[2] = {
        isManual: false,
        shareAmountText: null
      };
      expect(
        reducer(initialState,
          {
            type: 'sharesView/deleteShare',
            data: {
              shareIndex: 1,
              totalBill: '115.00'
            }
          }
        ).shares[0].shareAmountText
      ).toBe('57.50');
    });
    test('remove one of three shares, leaving 1 auto 1 manual', () => {
      initialState.shares[1] = {
        isManual: true,
        shareAmountText: '50.00'
      };
      initialState.shares[2] = {
        isManual: false,
        shareAmountText: null
      };
      const updatedState = reducer(initialState,
        {
          type: 'sharesView/deleteShare',
          data: {
            shareIndex: 2,
            totalBill: '115.00'
          }
        }
      );
      expect(
        updatedState.shares[0].shareAmountText
      ).toBe('65.00');
    });
    test('of three shares, deleting the 1 auto share results in the last share in array to change to auto', () => {
      initialState.shares[1] = {
        isManual: true,
        shareAmountText: '45.00'
      };
      initialState.shares[2] = {
        isManual: true,
        shareAmountText: '40.00'
      };
      const updatedState = reducer(initialState,
        {
          type: 'sharesView/deleteShare',
          data: {
            shareIndex: 0,
            totalBill: '115.00'
          }
        }
      );
      expect(
        updatedState.shares[1].isManual
      ).toBe(false);
      expect(
        updatedState.shares[1].shareAmountText
      ).toBe("70.00");
    });
  });

  describe('update from new bill total', () => {
    test('all auto share', () => {
      initialState.shares[1] = {
        isManual: false,
        shareAmountText: null
      }
      expect(reducer(initialState, {
        type: 'sharesView/updateFromNewBillTotal',
        data: { totalBill: '150.00' }
      }).shares[0].shareAmountText).toBe('75.00');
    });

    test('with a manual share', () => {
      initialState.shares[1] = {
        isManual: true,
        shareAmountText: '100.00'
      }
      expect(reducer(initialState, {
        type: 'sharesView/updateFromNewBillTotal',
        data: { totalBill: '150.00' }
      }).shares[0].shareAmountText).toBe('50.00');
    });

    test('only one share', () => {
      initialState.shares.splice(1, 1);
      expect(reducer(initialState, {
        type: 'sharesView/updateFromNewBillTotal',
        data: { totalBill: '120.00' }
      })).toBe(initialState);
    })
  });


  describe('reset share', () => {
    test('reset manual shares updates autoShareAmount and isManual prop on reset share', () => {
      initialState.shares[1] = {
        isManual: true,
        shareAmountText: '70.00'
      };
      const resetState = reducer(initialState,
        {
          type: 'sharesView/resetShare',
          data: {
            shareIndex: 1,
            totalBill: '120.00'
          }
        });
      expect(resetState.autoShareAmount)
        .toBe('60.00');
      expect(resetState.shares[1].isManual)
        .toBe(false);
    });
  });


  describe('reset shares', () => {
    test('reset manual shares updates autoShareAmount and all isManual props to false', () => {
      initialState.shares[1] = {
        isManual: true,
        shareAmountText: '70.00'
      };
      initialState.shares[2] = {
        isManual: true,
        shareAmountText: '20.00'
      };
      const resetState = reducer(initialState,
        {
          type: 'sharesView/resetShares',
          data: {
            shareIndex: 1,
            totalBill: '120.00'
          }
        });
      expect(resetState.autoShareAmount)
        .toBe('40.00');
      expect(resetState.shares[2].isManual)
        .toBe(false);
    });
  });

  describe('update from tip percentage change', () => {
    const action = {
      type: 'sharesView/updateFromTipPercentageChange',
      data: {
        preTipTotal: '150.00',
        tipPercentage: '20.0'
      }
    };

    test('bill total updates', () => {
      initialState.shares[1] = {
        isManual: true,
        shareAmountText: '60.00'
      };
      expect(reducer(initialState, action).autoShareAmount).toBe('120.00');

    });

    test('auto share value(s) update', () => {
      initialState.shares[1] = {
        isManual: true,
        shareAmountText: '50.00'
      };
      initialState.shares[2] = {
        isManual: false,
        shareAmountText: '40.00'
      };
      expect(reducer(initialState, action).shares[2].shareAmountText).toBe('65.00');
    });

    test('manual shares remain constant', () => {
      initialState.shares[1] = {
        isManual: true,
        shareAmountText: '50.00'
      };
      initialState.shares[2] = {
        isManual: false,
        shareAmountText: '40.00'
      };
      expect(reducer(initialState, action).shares[1].shareAmountText).toBe('50.00');
    });
  })

  describe('updating manual share', () => {
    //-------------PERCENT---------------
    let percent_action = {
      type: 'sharesView/updateManualShare',
      data: {
        preTipTotal: '100.00',
        tipPercentage: '20.0',
        shareIndex: 1,
        percentChangeAmount: 0.1
      }
    };
    test('small perc increment', () => {
      initialState.shares[1] = {
        isManual: true,
        shareAmountText: '70.00'
      }
      expect(reducer(initialState, percent_action).shares[1].shareAmountText).toBe('70.12');
    });

    test('large perc increment', () => {
      percent_action.data.percentChangeAmount = 1;
      initialState.shares[1] = {
        isManual: true,
        shareAmountText: '70.00'
      }
      expect(reducer(initialState, percent_action).shares[1].shareAmountText).toBe('71.20');
    });

    test('small perc decrement', () => {
      percent_action.data.percentChangeAmount = -0.1;
      initialState.shares[1] = {
        isManual: true,
        shareAmountText: '70.00'
      }
      expect(reducer(initialState, percent_action).shares[1].shareAmountText).toBe('69.88');
    });

    test('large perc decrement', () => {
      percent_action.data.percentChangeAmount = -1;
      initialState.shares[1] = {
        isManual: true,
        shareAmountText: '70.00'
      }
      expect(reducer(initialState, percent_action).shares[1].shareAmountText).toBe('68.80');
    });
    //-------------DOllAR---------------
    let dollar_action = {
      type: 'sharesView/updateManualShare',
      data: {
        preTipTotal: '100.00',
        tipPercentage: '20.0',
        shareIndex: 1,
        dollarChangeAmount: 0.01
      }
    };

    test('small dollar increment', () => {
      initialState.shares[1] = {
        isManual: true,
        shareAmountText: '70.00'
      }
      expect(reducer(initialState, dollar_action).shares[1].shareAmountText).toBe('70.01');
    });

    test('large dollar increment', () => {
      dollar_action.data.dollarChangeAmount = 1;
      initialState.shares[1] = {
        isManual: true,
        shareAmountText: '71.00'
      }
      expect(reducer(initialState, dollar_action).shares[1].shareAmountText).toBe('72.00');
    });

    test('small dollar decrement', () => {
      dollar_action.data.dollarChangeAmount = -0.01;
      initialState.shares[1] = {
        isManual: true,
        shareAmountText: '70.95'
      }

      expect(reducer(initialState, dollar_action).shares[1].shareAmountText).toBe('70.94');
    });

    test('large dollar decrement', () => {
      dollar_action.data.dollarChangeAmount = -1;
      initialState.shares[1] = {
        isManual: true,
        shareAmountText: '70.00'
      }
      // const val = reducer(initialState, dollar_action).shares[1].shareAmounText;
      // console.log('val val:', val);
      expect(reducer(initialState, dollar_action).shares[1].shareAmountText).toBe('69.00');
    });
  });
});