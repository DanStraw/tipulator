import { formatCurrencyForParse } from './currency';

const getAutoShareTotal = function (billTotalString, shares, shareIndex) {
  const parsedBillTotal = parseFloat(formatCurrencyForParse(formatCurrencyForParse(billTotalString))).toFixed(2);
  let autoShareTotal = parsedBillTotal;

  shares.forEach(share => {
    if (share.isManual) {
      autoShareTotal = (autoShareTotal - parseFloat(formatCurrencyForParse(share.shareAmountText))).toFixed(2);
    }
  });
  return autoShareTotal;
}

const getAutoShareCount = function (shares) {
  let count = 0;
  shares.forEach(share => {
    count = share.isManual ? count : count + 1;
  });
  return count;
}

const numStringToFloat = function (string) {
  return parseFloat(formatCurrencyForParse(string)).toFixed(2)
}

export const isDollarSmallIncrementAllowed = function (billTotal, shares, shareIndex) {
  let autoShareCount = getAutoShareCount(shares);
  const autoShareTotal = getAutoShareTotal(billTotal, shares, shareIndex);
  const isNotAllowed = ((autoShareTotal - 0.01).toFixed(2) / autoShareCount) < 0.01;
  shares[shareIndex].dollarSmallIncrementAllowed = !isNotAllowed;
  return shares[shareIndex].dollarSmallIncrementAllowed;
}

export const isDollarLargeIncrementAllowed = function (billTotal, shares, shareIndex) {
  let autoShareCount = getAutoShareCount(shares);
  const autoShareTotal = getAutoShareTotal(billTotal, shares, shareIndex);
  const isNotAllowed = ((autoShareTotal / autoShareCount) - 1.00).toFixed(2) < 0.01;
  shares[shareIndex].dollarLargeIncrementAllowed = !isNotAllowed;

  return shares[shareIndex].dollarLargeIncrementAllowed;
}

export const isDollarSmallDecrementAllowed = function (shares, shareIndex) {
  const isNotAllowed = numStringToFloat(shares[shareIndex].shareAmountText) <= 0.01;
  shares[shareIndex].dollarSmallDecrementAllowed = isNotAllowed ? false : true;
  return shares[shareIndex].dollarSmallDecrementAllowed;
}

export const isDollarLargeDecrementAllowed = function (shares, shareIndex) {
  const isNotAllowed = numStringToFloat(shares[shareIndex].shareAmountText || shares[shareIndex].shareAmount || shares[shareIndex].shareAmountNum) <= 1;
  shares[shareIndex].dollarLargeDecrementAllowed = !isNotAllowed;
  return shares[shareIndex].dollarLargeDecrementAllowed;
}

export const isPercentSmallIncrementAllowed = function (billTotal, shares, shareIndex) {
  let autoShareCount = getAutoShareCount(shares);
  const autoShareTotal = getAutoShareTotal(billTotal, shares, shareIndex);
  const changeAmt = (parseFloat(formatCurrencyForParse(billTotal)) * .001).toFixed(2);
  const isNotAllowed = changeAmt == 0 ? true : ((autoShareTotal - changeAmt).toFixed(2) / autoShareCount) < 0.01;
  shares[shareIndex].percentSmallIncrementAllowed = !isNotAllowed;
  return shares[shareIndex].percentSmallIncrementAllowed;
};

export const isPercentLargeIncrementAllowed = function (billTotal, shares, shareIndex) {
  let autoShareCount = getAutoShareCount(shares);
  const autoShareTotal = getAutoShareTotal(billTotal, shares, shareIndex);
  const changeAmt = (parseFloat(formatCurrencyForParse(billTotal)) * .01).toFixed(2);
  const isNotAllowed = changeAmt == 0 ? true : ((autoShareTotal - changeAmt).toFixed(2) / autoShareCount) < 0.01;
  shares[shareIndex].percentLargeIncrementAllowed = !isNotAllowed;
  return shares[shareIndex].percentLargeIncrementAllowed;
};

export const isPercentSmallDecrementAllowed = function (billTotal, shares, shareIndex) {
  const changeAmt = (parseFloat(formatCurrencyForParse(billTotal)) * .001).toFixed(2);
  const isNotAllowed = changeAmt == 0 ? true : numStringToFloat(shares[shareIndex].shareAmountText) <= changeAmt;
  shares[shareIndex].percentSmallDecrementAllowed = !isNotAllowed;
  return shares[shareIndex].percentSmallDecrementAllowed;
}

export const isPercentLargeDecrementAllowed = function (billTotal, shares, shareIndex) {
  const changeAmt = (parseFloat(formatCurrencyForParse(billTotal)) * .01).toFixed(2);
  const isNotAllowed = changeAmt == 0 ? true : numStringToFloat(shares[shareIndex].shareAmountText) <= changeAmt;
  shares[shareIndex].percentLargeDecrementAllowed = !isNotAllowed;
  return shares[shareIndex].percentLargeDecrementAllowed;
};

export const setAllCrements = function (billTotal, shares, shareIndex) {
  shares[shareIndex].dollarSmallIncrementAllowed = isDollarSmallIncrementAllowed(billTotal, shares, shareIndex);

  shares[shareIndex].dollarLargeIncrementAllowed = isDollarLargeIncrementAllowed(billTotal, shares, shareIndex);
  shares[shareIndex].dollarSmallDecrementAllowed = isDollarSmallDecrementAllowed(shares, shareIndex);
  shares[shareIndex].dollarLargeDecrementAllowed = isDollarLargeDecrementAllowed(shares, shareIndex);
  shares[shareIndex].percentSmallIncrementAllowed = isPercentSmallIncrementAllowed(billTotal, shares, shareIndex);
  shares[shareIndex].percentLargeIncrementAllowed = isPercentLargeIncrementAllowed(billTotal, shares, shareIndex);
  shares[shareIndex].percentSmallDecrementAllowed = isPercentSmallDecrementAllowed(billTotal, shares, shareIndex);
  shares[shareIndex].percentLargeDecrementAllowed = isPercentLargeDecrementAllowed(billTotal, shares, shareIndex);
  return shares[shareIndex];
}