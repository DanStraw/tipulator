import { formatCurrency, isValidCurrency } from '../validation/currency';

export default (state = "", action) => {
  switch (action.type) {
    case "UPDATE_PRE_TIP_TOTAL":
      const formattedCurrency = formatCurrency(action.text);
      return isValidCurrency(formattedCurrency) ? formattedCurrency : state;
    case "preTipTotal/UPDATE_FROM_BILL_TOTAL_CHANGE":
      // console.log('new one.', action);
      const { billTotalNum, preTipTotalNum, tipPercentage } = action.text;

      if (preTipTotalNum === 0) {
        // console.log('be If:', preTipTotalNum, billTotalNum);

        return formatCurrency(billTotalNum - (billTotalNum * 0.15));
      } else {
        //  console.log('wha:', (parseFloat(tipPercentage) + 1));
        return formatCurrency(billTotalNum / ((parseFloat(tipPercentage) / 100) + 1));
      }
    default:
      return state;
  }
}
