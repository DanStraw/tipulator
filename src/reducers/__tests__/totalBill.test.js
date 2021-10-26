import { expect, test } from '@jest/globals';
import reducer from '../totalBill';

describe('total bill reducer test', () => {
  test('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(0);
  });
  test('should increment by 1 dollar', () => {
    expect(reducer('5.00', { type: 'INCREMENT_DOLLAR' })).toBe('6.00');
  });
  test('should decrement by 1 dollar', () => {
    expect(reducer('5.00', { type: 'DECREMENT_DOLLAR' })).toBe('4.00');
  });
  test('should increment by 1 %', () => {
    expect(reducer('5.00', { type: 'INCREMENT_PERCENT' })).toBe('5.05');
  });
  test('should decrement by 1 %', () => {
    expect(reducer('5.00', { type: 'DECREMENT_PERCENT' })).toBe('4.95');
  });
  test('should return entered number', () => {
    expect(reducer('5.00', { type: 'MANUAL', text: '4.1' })).toBe('4.1');
  });
})