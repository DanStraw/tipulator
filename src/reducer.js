import totalBill from './reducers/totalBill';
import tipTotal from './reducers/tipTotal';
import preTipTotal from './reducers/preTipTotal';
import tipPercentage from './reducers/tipPercentage';
import share from './reducers/share';
import sharesView from './reducers/sharesView';
import { combineReducers } from 'redux';

export default combineReducers({
  preTipTotal,
  share,
  sharesView,
  totalBill,
  tipTotal,
  tipPercentage,
})