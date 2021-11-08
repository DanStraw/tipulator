import { formatCurrency, isValidCurrency } from '../validation/currency';

export default (state = "", action) => {
  switch (action.type) {
    case "UPDATE_PRE_TIP_TOTAL":
      const formattedCurrency = formatCurrency(action.text);
      return isValidCurrency(formattedCurrency) ? formattedCurrency : state;
    default:
      return state;
  }
}
