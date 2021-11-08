const isValidNumberString = (string, decimals) => {
  const condition = new RegExp(`^-?(\\d+|\\d{1,3}(,\\d{3})*)(\\.\\d{0,${decimals}})?$`, "g");
  // if (!condition.test(string)) {
  //   console.log(`${string}: ${condition.test(string)}`);
  // }
  return condition.test(string);
}

const formatCommas = (string) => {
  return string.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = {
isValidNumberString,
formatCommas
}