import { formatCurrencyForParse, formatCurrency } from '../validation/currency';
import { formatPercentageForParse, formatPercentage } from '../validation/percent';
import { setAllCrements } from '../validation/crement';
import Share from '../classes/Share';

const defaultState = {
  autoShareAmount: 0,
  shares: [
    new Share('0.00')
  ]
}

const setState = function (__state, __billTotal) {
  const __autoShares = __state.shares.filter(share => !share.isManual);
  const __manualShares = __state.shares.filter(share => share.isManual);
  let __billTotalLessManualShares = __billTotal;
  __manualShares.forEach(manualShare => {
    __billTotalLessManualShares -= parseFloat(formatCurrencyForParse(manualShare.shareAmountText));
  });
  const __autoShareAmount = (__billTotalLessManualShares / __autoShares.length).toFixed(2);

  const __autoShareAmtString = __autoShareAmount.toString();

  let __updatedState = __state;
  __updatedState.autoShareAmount = formatCurrency(__autoShareAmtString);
  __updatedState.shares.forEach((share, index) => {
    if (!share.isManual) {
      share.shareAmountText = formatCurrency(__autoShareAmtString);
      share.shareAmount = formatCurrency(__autoShareAmtString);
    };
    share.percentTotal = share.isManual ? ((parseFloat(formatCurrencyForParse(share.shareAmountText)) / __billTotal) * 100).toFixed(1) : ((__autoShareAmount / __billTotal) * 100).toFixed(1);
    __updatedState.shares[index] = setAllCrements(__billTotal, __updatedState.shares, index);
  });
  return __updatedState;
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'sharesView/addShare':
      // const newShare = {
      //   isManual: false,
      //   shareAmount: null,
      //   percentTotal: 0
      // }
      const newShare = new Share('0.00');
      const newShares = [...state.shares, newShare];
      const newState = { autoShareAmount: state.autoShareAmount, shares: newShares };

      return setState(newState, formatCurrencyForParse(action.data.totalBill));

    case 'sharesView/deleteShare':
      const dSDeleteIndex = action.data.shareIndex;
      let dsShares = state.shares;
      dsShares.splice(dSDeleteIndex, 1);
      let allManual = true;
      dsShares.forEach(share => {
        if (!share.isManual) {
          allManual = false;
        }
      });
      if (allManual) {
        dsShares[dsShares.length - 1].isManual = false;
      }

      const dsBillTotal = formatCurrencyForParse(action.data.totalBill);
      const dsState = { autoShareAmount: state.autoShareAmount, shares: dsShares };
      const dsUpdatedState = setState(dsState, dsBillTotal);
      return { ...dsUpdatedState };

    case 'sharesView/resetShare':
      const index_shareToReset = action.data.shareIndex;
      let rs1_updatedState = state;
      rs1_updatedState.shares[index_shareToReset].isManual = false;
      const rs1_newState = setState(rs1_updatedState, formatCurrencyForParse(action.data.totalBill));
      return { ...rs1_newState };

    case 'sharesView/resetShares':
      const rsBT = parseFloat(formatCurrencyForParse(action.data.totalBill));
      let rsState = state;
      const rsASA = (rsBT / rsState.shares.length);
      rsState.autoShareAmount = formatCurrency(rsASA);
      rsState.shares.forEach(share => {
        share.isManual = false;
        share.shareAmountText = formatCurrency(rsASA);
        share.percentTotal = formatPercentage((1 / rsState.shares.length) * 100);
      })

      return { ...rsState };

    case 'sharesView/updateAutoShareAmount':
      //TEST THIS WITH MANUAL SHARES
      if (state.shares.length === 1) return state;
      const preTipTotal = formatCurrencyForParse(action.data.preTipTotal);
      const tipPercentage = formatPercentageForParse(action.data.tipPercentage);
      const billTotal = preTipTotal * (1 + (tipPercentage / 100));
      return setState(state, billTotal);

    case 'sharesView/updateFromNewBillTotal':
      if (state.shares.length === 1) return state;
      const unbt_billTotal = formatCurrencyForParse(action.data.totalBill);

      return setState(state, unbt_billTotal);

    case 'sharesView/updateFromTipPercentageChange':
      const tpc_preTipTotal = action.data.preTipTotal
      const tpc_tipPercentage = action.data.tipPercentage;
      const multiplier = 1 + (parseFloat(formatPercentageForParse(tpc_tipPercentage)) / 100);

      const tpc_billTotal = parseFloat(formatCurrencyForParse(tpc_preTipTotal)) * multiplier;

      return setState(state, tpc_billTotal);
    case 'sharesView/updateManualShare':
      const ums_preTipTotal = action.data.preTipTotal;
      const ums_tipPercentage = action.data.tipPercentage;
      const ums_shareIndex = action.data.shareIndex;
      const ums_billTotal = parseFloat(formatCurrencyForParse(ums_preTipTotal)) * (1 + (parseFloat(formatPercentageForParse(ums_tipPercentage)) / 100));
      const ums_changeAmount = action.data.dollarChangeAmount || ((action.data.percentChangeAmount / 100) * ums_billTotal);
      let updatedState = state;
      updatedState.shares[ums_shareIndex].isManual = true;
      const manualShareInitialAmount = parseFloat(formatCurrencyForParse(updatedState.shares[ums_shareIndex].shareAmountText));
      let manualShareAmount = manualShareInitialAmount + ums_changeAmount;
      updatedState.shares[ums_shareIndex].shareAmountText = formatCurrency(manualShareAmount.toFixed(2).toString());
      const ums_newState = setState(updatedState, ums_billTotal);
      return { ...ums_newState };
    default:
      return state;
  }
}

