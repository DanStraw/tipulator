import { formatCurrencyForParse, formatCurrency } from '../validation/currency';
import { formatPercentageForParse } from '../validation/percent';

const initialState = {
  isManual: false,
  shareAmount: 0,
  percentTotal: 100
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'share/updateManualShare':
      console.log('ad:', action.data, state);
      // const ums_preTipTotal = action.data.preTipTotal;
      // const ums_tipPercentage = action.data.tipPercentage;
      // const ums_shareIndex = action.data.shareIndex;
      // const ums_billTotal = parseFloat(formatCurrencyForParse(ums_preTipTotal)) * (1 + (parseFloat(formatPercentageForParse(ums_tipPercentage)) / 100));
      // const ums_changeAmount = action.data.dollarChangeAmount || (action.data.percentChangeAmount * ums_billTotal);

      // let updatedState = state;
      // updatedState.shares[ums_shareIndex].isManual = true;
      // const manualShareInitialAmount = parseFloat(formatCurrencyForParse(updatedState.shares[ums_shareIndex].shareAmount));
      // let manualShareAmount = manualShareInitialAmount + ums_changeAmount;
      // updatedState.shares[ums_shareIndex].shareAmount = formatCurrency(manualShareAmount.toFixed(2).toString());
      // return setState(updatedState, ums_billTotal);
      let newState = state;
      newState.shareAmount = newState.shareAmount + 1;
      return newState;
    default:
      return state;
  }
}