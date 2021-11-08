import TipPercentage from '../components/TipPercentage';
import { isValidCurrency, formatCurrency, formatCurrencyForParse } from '../validation/currency';
import { isValidPercent, characterValidationLoop, formatPercentage } from '../validation/percent';

export default (state = "", action) => {
  switch (action.type) {
    case 'tipTotal/AUTO_UPTATE':

      const { preTipTotal, tipPercentage } = action.data;
      let tipPercentageString = '';

      if (typeof tipPercentage === 'number') {
        tipPercentageString = tipPercentage.toString();
      } else {
        tipPercentageString = tipPercentage;
      }

      if (isValidPercent(tipPercentageString, 2)) {

        const formattedPercent = formatPercentage(tipPercentageString);
        const formattedCurrency = formatCurrencyForParse(preTipTotal);

        if (isValidCurrency(formattedCurrency) && isValidPercent(formattedPercent)) {
          const parsedTotalBill = (parseFloat(formattedCurrency) * parseFloat(formattedPercent) / 100);
          return formatCurrency(parsedTotalBill.toFixed(2).toString());
        }
      }

      return state;
    default:
      return state;
  }
}