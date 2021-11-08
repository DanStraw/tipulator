import totalBill from './reducers/totalBill';
import tipTotal from './reducers/tipTotal';
import preTipTotal from './reducers/preTipTotal';
import tipPercentage from './reducers/tipPercentage';
import { combineReducers } from 'redux';

export default combineReducers({
  preTipTotal,
  totalBill,
  tipTotal,
  tipPercentage
})