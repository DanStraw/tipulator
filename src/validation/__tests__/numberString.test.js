import { isValidNumberString, formatCommas } from '../numberString';
import { expect, describe, test } from '@jest/globals';

describe('Number String Tests', () => {
  describe('IsValidNumberString', () => {

    test('invalid string containing letters', () => {
      expect(isValidNumberString('1,000.0d', 2)).toBe(false);
    });

    test('invalid string bad commas', () => {
      expect(isValidNumberString('2,00,000.12', 2)).toBe(false);
    });

    test('invalid string too many decimals', () => {
      expect(isValidNumberString('3,00,000.123', 2)).toBe(false);
    });

    test('valid string', () => {
      expect(isValidNumberString('4,300,000.13', 2)).toBe(true);
    });
  });

  describe('format Commas', () => {
    test('one comma added', () => {
      expect(formatCommas('12345.67')).toBe('12,345.67');
    });

    test('no commas added', () => {
      expect(formatCommas('345.67')).toBe('345.67');
    });
  })
})