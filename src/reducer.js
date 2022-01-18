import totalBill from './reducers/totalBill';
import tipTotal from './reducers/tipTotal';
import preTipTotal from './reducers/preTipTotal';
import tipPercentage from './reducers/tipPercentage';
import sharesView from './reducers/sharesView';
import { combineReducers } from 'redux';

export default combineReducers({
  preTipTotal,
  sharesView,
  totalBill,
  tipTotal,
  tipPercentage,
})