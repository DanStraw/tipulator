import { expect, test } from '@jest/globals';
import reducer from '../totalBill';

describe('total percentage reducer tests', () => {
  describe('Increment percent', () => {
    test('increment 1 percent', () => {
      expect(reducer("100.00", {
        type: "totalBill/INCREMENT_PERCENT"
      }))
        .toEqual("101.00");
    })
  });

  describe('decrement percent', () => {
    test('decrement 1 percent', () => {
      expect(reducer("100.00", {
        type: "totalBill/DECREMENT_PERCENT"
      }))
        .toEqual("99.00");
    })
  })

  describe('increment dollar', () => {
    test('increment by 1 dollar', () => {
      expect(reducer("200.00", {
        type: "totalBill/INCREMENT_DOLLAR"
      }))
        .toEqual("201.00");
    })
  })

  describe('decrement dollar', () => {
    test('increment by 1 dollar', () => {
      expect(reducer("200.00", {
        type: "totalBill/DECREMENT_DOLLAR"
      }))
        .toEqual("199.00");
    })
  });

  describe('MANUAL_UPDATE', () => {
    test('invalid manual update with letters', () => {
      expect(reducer("5,000.00", {
        type: "totalBill/MANUAL",
        text: "5,000.00d"
      }))
        .toEqual("5,000.00");
    });

    test('valid manual update with letters', () => {
      expect(reducer("5,000.00", {
        type: "totalBill/MANUAL",
        text: "5,000.000"
      }))
        .toEqual("50,000.00");
    })
  })

  describe('Format', () => {
    test('formats current state empty string to 0.00', () => {
      expect(reducer("", {
        type: "totalBill/FORMAT"
      }))
        .toEqual("0.00");
    })

    test('formats current state to valid format', () => {
      expect(reducer("123.548", {
        type: "totalBill/FORMAT"
      }))
        .toEqual("123.55");
    })
  });

  describe("AUTO_UPDATE", () => {
    test('invalid percent', () => {
      expect(reducer("100.00", {
        type: "totalBill/AUTO_UPDATE",
        data: {
          preTipTotal: "120.00",
          tipPercentage: "15d.5"
        }
      }))
        .toEqual("100.00");
    })

    test('valid percent', () => {
      expect(reducer("100.00", {
        type: "totalBill/AUTO_UPDATE",
        data: {
          preTipTotal: "120.00",
          tipPercentage: "1.50"
        }
      }))
        .toEqual("138.00");
    })

    test('invalid preTipTotal', () => {
      expect(reducer("100.00", {
        type: "totalBill/AUTO_UPDATE",
        data: {
          preTipTotal: "120d.00",
          tipPercentage: "1.50"
        }
      }))
        .toEqual("100.00");
    })
  })
})