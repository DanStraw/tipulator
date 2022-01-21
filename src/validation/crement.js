import { formatCurrencyForParse } from './currency';

const getAutoShareTotal = function (billTotalString, shares, shareIndex) {
  const parsedBillTotal = parseFloat(formatCurrencyForParse(formatCurrencyForParse(billTotalString))).toFixed(2);
  let autoShareTotal = parsedBillTotal;
  shares.forEach(share => {
    if (share.isManual) autoShareTotal -= parseFloat(formatCurrencyForParse(share.shareAmountText))
  });
  return autoShareTotal.toFixed(2);
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
  if (((autoShareTotal - 0.01).toFixed(2) / autoShareCount) < 0.01) {
    shares[shareIndex].dollarSmallIncrementAllowed = false
  }
  return shares[shareIndex].dollarSmallIncrementAllowed;
}

export const isDollarLargeIncrementAllowed = function (billTotal, shares, shareIndex) {
  let autoShareCount = getAutoShareCount(shares);
  const autoShareTotal = getAutoShareTotal(billTotal, shares, shareIndex);

  if (((autoShareTotal - 1.00).toFixed(2) / autoShareCount) < 0.01) {
    shares[shareIndex].dollarLargeIncrementAllowed = false
  }
  return shares[shareIndex].dollarLargeIncrementAllowed;
}

export const isDollarSmallDecrementAllowed = function (shares, shareIndex) {
  if (numStringToFloat(shares[shareIndex].shareAmountText) <= 0.01) {
    shares[shareIndex].dollarSmallDecrementAllowed = false;
  }
  return shares[shareIndex].dollarSmallDecrementAllowed;
}

export const isDollarLargeDecrementAllowed = function (shares, shareIndex) {
  if (numStringToFloat(shares[shareIndex].shareAmountText) <= 1) {
    shares[shareIndex].dollarLargeDecrementAllowed = false;
  }
  return shares[shareIndex].dollarLargeDecrementAllowed;
}

export const isPercentSmallIncrementAllowed = function (billTotal, shares, shareIndex) {
  let autoShareCount = getAutoShareCount(shares);
  const autoShareTotal = getAutoShareTotal(billTotal, shares, shareIndex);
  const changeAmt = (parseFloat(formatCurrencyForParse(billTotal)) * .001).toFixed(2);
  if (((autoShareTotal - changeAmt).toFixed(2) / autoShareCount) < 0.01) {
    shares[shareIndex].percentSmallIncrementAllowed = false;
  }
  return shares[shareIndex].percentSmallIncrementAllowed;
};

export const isPercentLargeIncrementAllowed = function (billTotal, shares, shareIndex) {
  let autoShareCount = getAutoShareCount(shares);
  const autoShareTotal = getAutoShareTotal(billTotal, shares, shareIndex);
  const changeAmt = (parseFloat(formatCurrencyForParse(billTotal)) * .01).toFixed(2);
  if (((autoShareTotal - changeAmt).toFixed(2) / autoShareCount) < 0.01) {
    shares[shareIndex].percentLargeIncrementAllowed = false;
  }
  return shares[shareIndex].percentLargeIncrementAllowed;
};

export const isPercentSmallDecrementAllowed = function (billTotal, shares, shareIndex) {
  const changeAmt = (parseFloat(formatCurrencyForParse(billTotal)) * .001).toFixed(2);
  if (numStringToFloat(shares[shareIndex].shareAmountText) <= changeAmt) {
    shares[shareIndex].percentSmallDecrementAllowed = false;
  }
  return shares[shareIndex].percentSmallDecrementAllowed;
}

export const isPercentLargeDecrementAllowed = function (billTotal, shares, shareIndex) {
  const changeAmt = (parseFloat(formatCurrencyForParse(billTotal)) * .01).toFixed(2);
  if (numStringToFloat(shares[shareIndex].shareAmountText) <= changeAmt) {
    shares[shareIndex].percentLargeDecrementAllowed = false;
  }
  return shares[shareIndex].percentLargeDecrementAllowed;
};