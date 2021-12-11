import { isValidPercent, characterValidationLoop, isANumber, formatPercentage } from '../validation/percent';


export default (state = "15.0", action) => {
  switch (action.type) {
    case 'TIP_PERCENTAGE/AUTO_UPDATE':
      const isValidString = isValidPercent(action.text.toString(), 2);
      if (!isValidString) {
        return state;
      }

      const formatted = formatPercentage(action.text);
      return formatted;
    case 'TIP_PERCENTAGE/BILL_TOTAL_UPDATE':
      const { billTotalNum, preTipTotalNum } = action.data;
      const tipTotal = billTotalNum - preTipTotalNum;
      const _tipPercentage = ((tipTotal / preTipTotalNum) * 100).toFixed(1).toString();
      return _tipPercentage;
    default:
      return state;
  }
}