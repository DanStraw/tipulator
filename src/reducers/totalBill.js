import { isValidCurrency, dropLeadingZeros } from '../validation/currency';


export default (state = 0.00, action) => {
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
      const newState = dropLeadingZeros(action.text.toString());
      const oldState = dropLeadingZeros(state.toString());
      return isValidCurrency(newState) ? newState : oldState;
    case 'FORMAT':
      return parseFloat(state).toFixed(2).toString();
    default:
      return state;
  }
}