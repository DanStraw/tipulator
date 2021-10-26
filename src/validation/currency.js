const isValidCurrency = string => {
  const condition = new RegExp(/^(\d+|\d{1,3}(,\d{0,3})*)(\.\d{0,2})?$/, "g");
  return condition.test(string);
}

const dropLeadingZeros = string => {
  return string.charAt(0) == '0' ? dropLeadingZeros(string.substring(1)) : string;
}

module.exports = { isValidCurrency, dropLeadingZeros };