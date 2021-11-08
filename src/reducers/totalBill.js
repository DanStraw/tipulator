import { isValidCurrency, formatCurrency, formatCurrencyForParse } from '../validation/currency';
import { isValidPercent, characterValidationLoop, formatPercentageForParse } from '../validation/percent';


export default (state = "", action) => {
  switch (action.type) {
    case 'totalBill/INCREMENT_PERCENT':
      return (parseFloat(state) * 1.01).toFixed(2).toString();
    case 'totalBill/DECREMENT_PERCENT':
      return (parseFloat(state) * 0.99).toFixed(2).toString();
    case 'totalBill/INCREMENT_DOLLAR':
      return (parseFloat(state) + 1).toFixed(2).toString();
    case 'totalBill/DECREMENT_DOLLAR':
      return (parseFloat(state) - 1).toFixed(2).toString();
    case 'totalBill/MANUAL':
      const oldState = state.toString();
      const newState = action.text.toString();
      const newStateFormatted = formatCurrency(newState);
      return isValidCurrency(newStateFormatted) ? newStateFormatted : oldState;
    case 'totalBill/FORMAT':
      return state === "" ? "0.00" : state;
    case 'totalBill/AUTO_UPDATE':

      const { preTipTotal, tipPercentage } = action.data;

      if (!isValidPercent(tipPercentage.toString())) {
        return state;
      }

      const formattedPercent = formatPercentageForParse(tipPercentage);
      const formattedCurrency = formatCurrencyForParse(preTipTotal);

      if (isValidCurrency(formattedCurrency) && isValidPercent(formattedPercent)) {
        const parsedTotalBill = parseFloat(formattedCurrency) + (parseFloat(formattedCurrency) * parseFloat(formattedPercent) / 100);
        return formatCurrency(parsedTotalBill.toFixed(2).toString());
      }
      return state;
    default:
      return state;
  }
}