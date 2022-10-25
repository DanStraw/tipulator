import { expect, describe, test } from '@jest/globals';
import {
  isDollarSmallIncrementAllowed,
  isDollarLargeIncrementAllowed,
  isDollarSmallDecrementAllowed,
  isDollarLargeDecrementAllowed,
  isPercentSmallIncrementAllowed,
  isPercentLargeIncrementAllowed,
  isPercentSmallDecrementAllowed,
  isPercentLargeDecrementAllowed
} from '../crement';

import Share from '../../classes/Share';
const shares = [new Share("900.00", true), new Share("50.00"), new Share("50.00")];

describe('Dollar Small increment', () => {
  describe('should return true', () => {
    //if the manual share is less than bill total enough to allow at least 1 cent for each auto share, the shares dollarSmallIncrementAllowed should return true

    test('one cent increase to the manual share allowed', () => {
      const billTotal = "1,000.03";
      expect(isDollarSmallIncrementAllowed(billTotal, shares, 0)).toBe(true);
    });
  });

  describe('should return false', () => {
    test('one cent increase to the manual share not allowed', () => {
      const billTotal = "900.02";
      expect(isDollarSmallIncrementAllowed(billTotal,
        [new Share("900.00", true), new Share("0.01"), new Share("0.01")], 0)).toBe(false);
    });
  });

  describe('Two manual shares', () => {
    test('return true with 2 manual shares', () => {
      const billTotal = "950.03";
      expect(isDollarSmallIncrementAllowed(billTotal,
        [new Share("900.00", true), new Share("0.01"), new Share("0.02"), new Share('50.00', true)], 0)).toBe(true);
    })
    test('return false with 2 manual shares', () => {
      const billTotal = "950.02";
      expect(isDollarSmallIncrementAllowed(billTotal,
        [new Share("900.00", true), new Share("0.01"), new Share("0.01"), new Share('50.00', true)], 0)).toBe(false);
    })
  })
});

describe('Dollar Large Increment', () => {
  describe('should return true', () => {
    test('one dollar increase to the manual share allowed', () => {
      const billTotal = "1,000.00";
      expect(isDollarLargeIncrementAllowed(billTotal, [new Share("900.00", true), new Share("50.00"), new Share("50.00")], 0)).toBe(true);
    });
  });

  describe('should return false', () => {
    test('one dollar increase to manual share not be allowed', () => {
      const billTotal = "901.01";
      expect(isDollarLargeIncrementAllowed(billTotal, [new Share("900.01", true), new Share("0.50"), new Share("0.50")], 0)).toBe(false);
    })
  });
});

describe('Dollar Small Decrement', () => {
  describe('should return true', () => {
    test('if manual share is greater than 1 cent, decrementing one cent is allowed', () => {
      expect(isDollarSmallDecrementAllowed([new Share("0.02", true), new Share("24.99"), new Share("24.99")], 0)).toBe(true);
    });
  });

  describe('should return false', () => {
    test('if manual share is 1 cent or less, return false', () => {
      expect(isDollarSmallDecrementAllowed([new Share("0.01", true), new Share("24.99"), new Share("24.99")], 0)).toBe(false);
    })

  });
});

describe('Dollar Large Decrement', () => {
  describe('should return true', () => {
    test('if manual share is greater than 1 dollar, decrementing one dollar is allowed', () => {

      expect(isDollarLargeDecrementAllowed([new Share("1.50", true), new Share("30.00"), new Share("30.00")], 0)).toBe(true);
    });
    test('share amt given as num not text', () => {
      expect(isDollarLargeDecrementAllowed([new Share(null, false, 33.3, 5.00), new Share(null, false, 33.3, 5.00), new Share(null, false, 33.3, 5.00)], 1)).toBe(true);
    });
  });

  describe('should return false', () => {
    test('if manual share is 1 dollar or less, return false', () => {

      expect(isDollarLargeDecrementAllowed([new Share("0.50", true), new Share("30.50"), new Share("30.50")], 0)).toBe(false);
    })

  });
});

describe('Percent Samll Increment', () => {
  describe('return true', () => {
    test('if 0.1 percent increase will leave enough in auto share total to have 1 cent each auto share, return true', () => {
      const billTotal = '100.00';
      const shares = [
        new Share("0.20"),
        new Share("99.40", true),
        new Share("0.20")
      ]
      expect(isPercentSmallIncrementAllowed(billTotal, shares, 1)).toBe(true);
    })
  });
  describe('return false', () => {
    test('change amt is 0', () => {
      const billTotal = '1.00';
      const shares = [
        new Share("0.01"),
        new Share("0.98", true),
        new Share("0.01")
      ];
      expect(isPercentSmallIncrementAllowed(billTotal, shares, 1)).toBe(false);
    });

    test('increasing the manual share by 0.1% would bring autoshares to or below 0', () => {
      const billTotal = '100.00';
      const shares = [
        new Share("0.04"),
        new Share("99.92", true),
        new Share("0.04")
      ]
      expect(isPercentSmallIncrementAllowed(billTotal, shares, 1)).toBe(false);
    });
  });
});

describe('Percent Large Increment', () => {
  describe('return true', () => {
    test('if 1 percent increase will leave enough in auto share total to have 1 cent each auto share, return true', () => {
      const billTotal = '100.00';
      const shares = [
        new Share("0.51"),
        new Share("98.98", true),
        new Share("0.51")
      ]
      expect(isPercentLargeIncrementAllowed(billTotal, shares, 1)).toBe(true);
    });

  });

  describe('return false', () => {
    test('increasing the manual share by 1% would bring autoshares to or below 0', () => {
      const billTotal = '100.00';
      const shares = [
        new Share("0.49"),
        new Share("99.02", true),
        new Share("0.49")
      ]
      expect(isPercentLargeIncrementAllowed(billTotal, shares, 1)).toBe(false);
    });
    test('bill total too small', () => {
      const billTotal = '0.04';
      const shares = [
        new Share("0.01"),
        new Share("0.02", true),
        new Share("0.01")
      ]
      expect(isPercentLargeIncrementAllowed(billTotal, shares, 1)).toBe(false);
    })
  });
});

describe('Percent Samll Decrement', () => {
  describe('return true', () => {
    test('0.1% decrement would not bring manual share to or below 0', () => {
      const billTotal = "200.00";
      const shares = [
        new Share("99.89"),
        new Share(".22", true),
        new Share("99.89")
      ];
      expect(isPercentSmallDecrementAllowed(billTotal, shares, 1)).toBe(true);
    });
  });
  describe('return false', () => {
    test('0.1% decrement would bring manual share to or below 0', () => {
      const billTotal = "200.00";
      const shares = [
        new Share("99.94"),
        new Share("0.12", true),
        new Share("99.94")
      ];
      expect(isPercentSmallDecrementAllowed(billTotal, shares, 1)).toBe(false);
    });
    test('change amt too small to (0.1% would round to less than 1 cent)', () => {
      const billTotal = "0.49";
      const shares = [
        new Share("0.05"),
        new Share("0.39", true),
        new Share("0.05")
      ];
      expect(isPercentSmallDecrementAllowed(billTotal, shares, 1)).toBe(false);
    })
  });
});

describe('Percent Large Decrement', () => {
  describe('return true', () => {
    test('1% decrement would not bring manual share to or below 0', () => {
      const billTotal = "200.00";
      const shares = [
        new Share("98.99"),
        new Share("2.02", true),
        new Share("98.99")
      ];
      expect(isPercentLargeDecrementAllowed(billTotal, shares, 1)).toBe(true);
    });
  });
  describe('return false', () => {
    test('1% decrement would bring manual share to or below 0', () => {
      const billTotal = "200.00";
      const shares = [
        new Share("99.00"),
        new Share("2.00", true),
        new Share("99.00")
      ];
      expect(isPercentLargeDecrementAllowed(billTotal, shares, 1)).toBe(false);
    });
    test('1% of total bill would be less than 1 cent', () => {
      const billTotal = "0.49";
      const shares = [
        new Share("0.01"),
        new Share("0.47", true),
        new Share("0.01")
      ];
      expect(isPercentLargeDecrementAllowed(billTotal, shares, 1)).toBe(false);
    });
  });
});