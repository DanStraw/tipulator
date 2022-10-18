import { isValidCurrency, formatCurrency, formatCurrencyNegativeAllowable, formatCurrencyForParse } from '../validation/currency';
import { isValidPercent, characterValidationLoop, formatPercentage, formatPercentageForParse } from '../validation/percent';

export default (state = "", action) => {
  switch (action.type) {
    case 'tipTotal/AUTO_UPTATE':

      const { preTipTotal, tipPercentage } = action.data;
      let tipPercentageString = '';

      if (typeof tipPercentage === 'number') {
        tipPercentageString = tipPercentage.toFixed(1).toString();
      } else {
        tipPercentageString = tipPercentage;
      }
      if (isValidPercent(tipPercentageString, 2)) {
        const formattedPercent = formatPercentageForParse(tipPercentageString);
        const formattedCurrency = formatCurrencyForParse(preTipTotal);
        if (isValidCurrency(formattedCurrency) && isValidPercent(formattedPercent)) {
          const parsedTipTotal = (parseFloat(formatCurrencyForParse(formattedCurrency)) * parseFloat(formatPercentageForParse(formattedPercent)) / 100);
          return formatCurrencyNegativeAllowable(parsedTipTotal.toFixed(2).toString());
        }
      }
      return state;
    case 'tipTotal/BILL_UPDATE':
      const { billTotalNum } = action.data;
      const bu_tipPercentage = action.data.tipPercentage;
      const tipDecimal = (typeof bu_tipPercentage === 'string') ? formatPercentageForParse(bu_tipPercentage) : bu_tipPercentage;
      let tipTotal = billTotalNum - (billTotalNum / (1 + (parseFloat(tipDecimal) / 100)));
      return formatCurrencyNegativeAllowable(tipTotal.toFixed(2).toString());
    default:
      return state;
  }
}