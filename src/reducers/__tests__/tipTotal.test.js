import { expect, test, describe } from '@jest/globals';
import reducer from '../tipTotal';

describe('Tip reducer dummy', () => {
  test('dummy', () => {
    expect(true).toBeTruthy();
  })

  describe('tipTotal/AUTO_UPDATE', () => {
    test('valid format with tipPercentage "number"', () => {
      expect(reducer("10.00", {
        type: 'tipTotal/AUTO_UPTATE', data: {
          preTipTotal: "100.00", tipPercentage: 15.0
        }
      })).toBe("15.00");
    });

    test('valid format with tipPercentage "string"', () => {
      expect(reducer("10.00", {
        type: 'tipTotal/AUTO_UPTATE', data: {
          preTipTotal: "100.00", tipPercentage: "20.0"
        }
      })).toBe("20.00");
    });

    test('Invalid tipPercent length with "."', () => {
      expect(reducer("10.00", {
        type: 'tipTotal/AUTO_UPTATE', data: {
          preTipTotal: "100.00", tipPercentage: "2,000.002"
        }
      })).toBe("10.00");
    });

    test('valid tipPercent length negative and . and abs >=1000', () => {
      expect(reducer("10.00", {
        type: 'tipTotal/AUTO_UPTATE', data: {
          preTipTotal: "100.00", tipPercentage: "-2000.0"
        }
      })).toBe("-2,000.00");
    });

    test('decmial will be added before final digit', () => {
      expect(reducer("10.00", {
        type: 'tipTotal/AUTO_UPTATE', data: {
          preTipTotal: "100.00", tipPercentage: "-300"
        }
      })).toBe("-30.00");
    });

    test('Invalid tipPercent comma', () => {
      expect(reducer("10.00", {
        type: 'tipTotal/AUTO_UPTATE', data: {
          preTipTotal: "100.00", tipPercentage: "-20,00"
        }
      })).toBe("10.00");
    });

    test('Character validation loop should fail', () => {
      expect(reducer("10.00", {
        type: 'tipTotal/AUTO_UPTATE', data: {
          preTipTotal: "100.00", tipPercentage: "2d0"
        }
      })).toBe("10.00");
    });

    test('Currency validation loop should fail', () => {
      expect(reducer("10.00", {
        type: 'tipTotal/AUTO_UPTATE', data: {
          preTipTotal: "1,0d0.00", tipPercentage: "20.0"
        }
      })).toBe("10.00");
    });

    test('tip total calc from total bill update', () => {
      expect(reducer("15.00", {
        type: 'tipTotal/BILL_UPDATE', data: {
          billTotalNum: '118.00',
          preTipTotalNum: '100.00',
          tipPercentage: '18.0'
        }
      })).toBe('18.00');
    });
  })
})