import { isValidNumberString, formatCommas } from './numberString';

const isValidPercent = (number, decimals = 2) => {
  return isValidNumberString(number, decimals);
}

const isANumber = char => {
  const condition = new RegExp(/^\-|\d|\./, "g");
  return condition.test(char);
}

const characterValidationLoop = string => {
  for (let char in string) {
    if (!isANumber(string[char])) {
      return false;
    };
  }
  return true;
}

const formatPercentage = number => {
  const numString = number.toString();
  if (numString.length === 0) {
    return 15.0;
  } else if (numString.length === 1) {
    switch (numString) {
      case ".":
        return 15.0;
      default:
        return parseFloat(`0.${numString}`);
    }
  } else if (numString.length === 2) {
    const numStringArray = numString.split(".");
    return numStringArray[0].length === 0 ? `0.${numStringArray[1]}` : `${numStringArray[0]}`;
  } else {
    const numStringNoDecimal = numString.split(".").join("");
    const digits = numStringNoDecimal.slice(0, numStringNoDecimal.length - 1);
    const output = [formatCommas(digits), ".", numStringNoDecimal.slice(numStringNoDecimal.length - 1)].join("");

    return output;
  }


}

const formatPercentageForParse = numString => {
  return numString.split(",").join("");
}

export {
  isValidPercent,
  isANumber,
  characterValidationLoop,
  formatPercentage,
  formatPercentageForParse
}