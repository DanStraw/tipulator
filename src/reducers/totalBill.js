import { isValidCurrency, dropLeadingZeros, formatDecimals, formatCommas, removeCommas } from '../validation/currency';


export default (state = "", action) => {
  switch (action.type) {
    case 'INCREMENT_PERCENT':
      return (parseFloat(state) * 1.01).toFixed(2).toString();
    case 'DECREMENT_PERCENT':
      return (parseFloat(state) * 0.99).toFixed(2).toString();
    case 'INCREMENT_DOLLAR':
      return (parseFloat(state) + 1).toFixed(2).toString();
    case 'DECREMENT_DOLLAR':
      return (parseFloat(state) - 1).toFixed(2).toString();
    case 'MANUAL':
      const newState = action.text.toString();
      let newStateFormatted = formatDecimals(newState);
      newStateFormatted = dropLeadingZeros(newStateFormatted);
      let [integers, decimals] = newStateFormatted.split(".");
      const numberStringNoCommas = removeCommas(integers);
      integers = formatCommas(numberStringNoCommas);
      newStateFormatted = integers + "." + decimals;
      const oldState = state.toString();
      return isValidCurrency(newStateFormatted) ? newStateFormatted : oldState;
    case 'FORMAT':
      return parseFloat(state).toFixed(2).toString();
    default:
      return state;
  }
}