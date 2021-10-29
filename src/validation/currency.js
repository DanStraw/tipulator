const isValidCurrency = string => {
  const condition = new RegExp(/^(\d+|\d{1,3}(,\d{3})*)(\.\d{0,2})?$/, "g");
  return condition.test(string);
}

const dropLeadingZeros = string => {
  if (string.length > 4) {
    return string.charAt(0) == '0' ? dropLeadingZeros(string.substring(1)) : string;
  }
  return string;
}

const formatDecimals = string => {
  if (string.length < 1) {
    return "0.00";
  } else if (string.length === 1) {
    return `0.0${string}`;
  } else if (string.length === 2) {
    return `0.${string}`;
  } else if (string.length === 3) {
    const stringArray = string.split(".");
    if (stringArray[0].length === stringArray[1].length) {
      return `${string}0`;
    }
    return `0${string}`;
  } else {
    const numberNoDecimal = string.split(".").join("");
    const output = numberNoDecimal.substring(0, numberNoDecimal.length - 2) + "." + numberNoDecimal.substring(numberNoDecimal.length - 2, numberNoDecimal.length);
    return output;
  }
}

const formatCommas = string => {
  return string.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const removeCommas = string => {
  return string.split(",").join("");
}

module.exports = { isValidCurrency, dropLeadingZeros, formatDecimals, formatCommas, removeCommas };