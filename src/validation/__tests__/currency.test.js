import { expect, describe, test } from '@jest/globals';
import { isValidCurrency, dropLeadingZeros } from '../currency';

describe('currency format tests', () => {
  const pass = ['5', '5.00', '6,000', '6,000.00', '70000', '5.0', , '6,00', '6,0.00'];
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
  const numSets = [['01', '1'], ['2', '2'], ['003.0', '3.0']];
  numSets.forEach((numSet) => {
    test(`${numSet[0]} should output ${numSet[1]}`, () => {
      expect(dropLeadingZeros(numSet[0])).toBe(numSet[1]);
    })
  })
})