import { expect, describe, test } from '@jest/globals';
import { isValidCurrency, dropLeadingZeros, formatDecimals, removeCommas, formatCurrency, formatCurrencyForParse, formatCurrencyNegativeAllowable } from '../currency';
import { formatCommas } from '../numberString';

describe('currency format tests', () => {
  const pass = ['5', '5.00', '6,000', '6,000.00', '70000', '600', , '5.0'];
  const fail = ['d', '5.00.0', '7.000', '700.000,000', '8.00.00'];

  pass.forEach(passString => {
    test(`${passString} should pass`, () => {
      expect(isValidCurrency(passString)).toBeTruthy();
    })
  });

  fail.forEach(failString => {
    test(`"${failString}" should fail`, () => {
      expect(isValidCurrency(failString)).toBeFalsy();
    })
  })
})

describe('drop leading zeros', () => {
  const numSets = [['0.01', '0.01'], ['.02', '.02'], ['003.00', '3.00']];
  numSets.forEach((numSet) => {
    test(`${numSet[0]} should output ${numSet[1]}`, () => {
      expect(dropLeadingZeros(numSet[0])).toBe(numSet[1]);
    })
  })
});

describe('format Decimals', () => {
  const input = ["", "1", "21", "2.0", "30.0", "4000.", ".05"]
  const output = ["0.00", "0.01", "0.21", "2.00", "3.00", "40.00", "0.05"];
  for (let i = 0; i < input.length; i++) {
    test(`${input[i]} should output ${output[i]}`, () => {
      expect(formatDecimals(input[i])).toBe(output[i]);
    })
  }
})

describe('commas format', () => {
  const numberSets = [["5", "5"], ["600", "600"], ["7654", "7,654"], ["800,000,0", "8,000,000"]];
  numberSets.forEach(numberSet => {
    test(`${numberSet[0]} should output ${numberSet[1]}`, () => {
      const commasRemoved = removeCommas(numberSet[0]);
      const commasReformatted = formatCommas(commasRemoved);
      expect(commasReformatted).toBe(numberSet[1]);
    })
  })
});


describe('formattedCurrency', () => {
  const numSets = [['00.01', '0.01'], ['2000', '20.00'], ['300000', '3,000.00']];
  numSets.forEach(numberSet => {
    test(`${numberSet[0]} should output ${numberSet[1]}`, () => {
      expect(formatCurrency(numberSet[0])).toBe(numberSet[1]);
    })
  })
});

describe('number given to format Decimals', () => {
  test('float number 200.0 should return string "200.00"', () => {
    expect(formatDecimals(200.0)).toBe('200.00');
  });
});

describe('format currency for parse', () => {
  test('invalid currency', () => {
    expect(formatCurrencyForParse('-30,00.000')).toBe('-30,00.000');
  })
});

describe('format negative allowable', () => {
  test('invalid negative currency', () => {
    expect(formatCurrencyNegativeAllowable('-30,0d0.000')).toBe(null);
  })
});