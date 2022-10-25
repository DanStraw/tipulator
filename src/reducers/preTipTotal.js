import { formatCurrency, isValidCurrency, formatC } from '../validation/currency';

export default (state = "", action) => {
  switch (action.type) {
    case "UPDATE_PRE_TIP_TOTAL":
      const formattedCurrency = formatCurrency(action.text);
      return isValidCurrency(formattedCurrency) ? formattedCurrency : state;
    case "preTipTotal/UPDATE_FROM_BILL_TOTAL_CHANGE":
      if (action.text.billTotalNum === undefined) return state;
      const { billTotalNum, preTipTotalNum, tipPercentage } = action.text;


      if (tipPercentage === undefined || typeof tipPercentage !== 'number') {
        return formatCurrency(billTotalNum / 1.15);
      } else {
        return formatCurrency(billTotalNum / ((parseFloat(tipPercentage) / 100) + 1));
      }
    default:
      return state;
  }
}
