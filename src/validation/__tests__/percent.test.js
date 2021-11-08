import { expect, describe, test } from '@jest/globals';
import { isValidPercent, isANumber, characterValidationLoop, formatPercentage } from '../percent';

describe('percent validation tests', () => {
  describe('isValid Percent Function', () => {
    test('invalid contains letters', () => {
      expect(isValidPercent('12ab.01')).toBe(false);
    });

    test('invalid contains too many decimals', () => {
      expect(isValidPercent('12.012', 2)).toBe(false);
    });

    test('Commas are allowed', () => {
      expect(isValidPercent('1,234.2')).toBe(true);
    });

    test('valid percent ', () => {
      expect(isValidPercent('234.2')).toBe(true);
    });
  });

  describe('isNumber Function', () => {
    test('decimal point allowed', () => {
      expect(isANumber('.')).toBe(true);
    });

    test('- allowed', () => {
      expect(isANumber('-')).toBe(true);
    });

    test('digit allowed', () => {
      expect(isANumber('7')).toBe(true);
    });

    test('letter not allowed', () => {
      expect(isValidPercent('f')).toBe(false);
    });

    test('commas not allowed', () => {
      expect(isValidPercent(',')).toBe(false);
    });
  });

  describe('charValidationLoop Function', () => {
    test('Valid', () => {
      expect(characterValidationLoop('-12.50')).toBe(true);
    });

    test('invalid', () => {
      expect(characterValidationLoop('1w.q3')).toBe(false);
    });

  });

  describe('formatPercent Function', () => {
    test('empty string returns 15', () => {
      expect(formatPercentage('')).toBe(15.0);
    });

    test('decimal returns 15', () => {
      expect(formatPercentage('.')).toBe(15.0);
    });

    test('solitary `5` returns 0.5', () => {
      expect(formatPercentage('5')).toBe(0.5);
    });

    test('2. returns 2', () => {
      expect(formatPercentage('2.')).toBe("2");
    });

    test('.3 returns 0.3', () => {
      expect(formatPercentage('.3')).toBe('0.3');
    });

    test('50 returns 50', () => {
      expect(formatPercentage('50')).toBe('50');
    });

    test('5.13 returns 51.3', () => {
      expect(formatPercentage('5.13')).toBe('51.3');
    });



  });
})