import { formatCommas } from './numberString'

const isValidCurrency = string => {
  const condition = new RegExp(/^(\d+|\d{1,3}(,\d{3})*)(\.\d{0,2})?$/, "g");
  return condition.test(string);
}

const isValidNegativeCurrency = string => {
  const condition = new RegExp(/^\-?(\d+|\d{1,3}(,\d{3})*)(\.\d{0,2})?$/, "g");
  return condition.test(string);
}

const dropLeadingZeros = (string) => {
  if (string.length > 4) {
    return string.charAt(0) == '0' ? dropLeadingZeros(string.substring(1)) : string;
  }
  return string;
}

const formatDecimals = (string) => {
  if (typeof string === "number") {
    console.log('type:', typeof string, 'st:', string);
    string = string.toFixed(2).toString();
  }
  if (string.length < 1) {
    return "0.00";
  } else if (string.length === 1) {
    return `0.0${string}`;
  } else if (string.length === 2) {
    return `0.${string}`;
  } else if (string.length === 3) {
    const stringArray = string.split(".");
    if (!stringArray[1] || (stringArray[0].length === stringArray[1].length)) {
      return `${string}0`;
    }
    return `0${string}`;
  } else {
    const numberNoDecimal = string.split(".").join("");
    const output = numberNoDecimal.substring(0, numberNoDecimal.length - 2) + "." + numberNoDecimal.substring(numberNoDecimal.length - 2, numberNoDecimal.length);

    return output;
  }
}

const removeCommas = (string) => {
  return string.split(",").join("");
}

const splitAtDecimal = (string) => {
  return string.split(".");
}

const joinIntegersToDecimals = (stringArray) => {
  return stringArray[0] + "." + stringArray[1];
}


const formatCurrency = function (initialState) {
  const newStateFormatted = formatDecimals(initialState);
  const droppedZeroes = dropLeadingZeros(newStateFormatted);
  const [integers, decimals] = splitAtDecimal(droppedZeroes);
  const integersNoCommas = removeCommas(integers);
  const integersReformattedCommas = formatCommas(integersNoCommas);
  const formattedCurrency = joinIntegersToDecimals([integersReformattedCommas, decimals]);
  return isValidCurrency(formattedCurrency) ? formattedCurrency : initialState;
}

const formatCurrencyNegativeAllowable = function (initialState) {
  const newStateFormatted = formatDecimals(initialState);
  const droppedZeroes = dropLeadingZeros(newStateFormatted);
  const [integers, decimals] = splitAtDecimal(droppedZeroes);
  const integersNoCommas = removeCommas(integers);
  const integersReformattedCommas = formatCommas(integersNoCommas);
  const formattedCurrency = joinIntegersToDecimals([integersReformattedCommas, decimals]);
  return isValidNegativeCurrency(formattedCurrency) ? formattedCurrency : initialState;
}

const formatCurrencyForParse = function (initialState) {
  console.log('is parse:', initialState);
  const newStateFormatted = formatDecimals(initialState);
  const droppedZeroes = dropLeadingZeros(newStateFormatted);
  const [integers, decimals] = splitAtDecimal(droppedZeroes);
  const integersNoCommas = removeCommas(integers);
  const formattedCurrency = joinIntegersToDecimals([integersNoCommas, decimals]);

  return isValidCurrency(formattedCurrency) ? formattedCurrency : initialState;
}

export {
  isValidCurrency,
  isValidNegativeCurrency,
  dropLeadingZeros,
  formatDecimals,
  removeCommas,
  formatCurrency,
  formatCurrencyNegativeAllowable,
  formatCurrencyForParse
};