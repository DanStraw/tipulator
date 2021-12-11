import React from 'react';
import { connect } from 'react-redux';
import { TextInput, StyleSheet } from 'react-native';
import { BILL_TOTAL_MANUAL_UPDATE, FORMAT, TIP_PERCENTAGE_BILL_UPDATE, TIP_TOTAL_AUTO_UPDATE, TIP_TOTAL_BILL_UPDATE, SHARES_VIEW_UPDATE_FROM_NEW_BILL_TOTAL } from './actions';

const mapStateToProps = (state) => {
  const { totalBill, preTipTotal } = state;
  return { totalBill, preTipTotal };
}

const mapDispatchToProps = (dispatch) => {
  return {
    manualUpdateBillTotal: (val) => dispatch({ type: BILL_TOTAL_MANUAL_UPDATE, text: val }),
    format: (val) => dispatch({ type: FORMAT, text: val }),
    updateTipPercentage: val => dispatch({ type: TIP_PERCENTAGE_BILL_UPDATE, data: { ...val } }),
    updateTipTotal: val => dispatch({ type: TIP_TOTAL_BILL_UPDATE, data: { ...val } }),
    updateAutoShares: val => dispatch({ type: SHARES_VIEW_UPDATE_FROM_NEW_BILL_TOTAL, data: { ...val } })
  }
}

const BillInput = props => {

  const inputChangeEventHandler = function (value) {
    let updatedBillTotal = value.split(",").join("");
    updatedBillTotal = updatedBillTotal.split(".").join("");
    updatedBillTotal = updatedBillTotal.substring(0, updatedBillTotal.length - 2) + "." + updatedBillTotal.substring(updatedBillTotal.length - 2);
    const billTotalNum = parseFloat(updatedBillTotal);

    const preTipTotal = props.preTipTotal === "" ? "0.00" : props.preTipTotal;
    const preTipTotalNum = parseFloat(preTipTotal.split(",").join(""));

    props.manualUpdateBillTotal(value);
    props.updateTipPercentage({ billTotalNum, preTipTotalNum });
    props.updateTipTotal({ billTotalNum, preTipTotalNum });
    props.updateAutoShares({ totalBill: value });
  }

  const blurEventHandler = (event) => {
    props.format(event.target.value);
  }

  return (
    <TextInput
      value={props.totalBill}
      keyboardType='numeric'
      onChangeText={inputChangeEventHandler}
      onBlur={blurEventHandler}
      placeHolder="0.00"
      placeholderTextColor="#ff00ff"
      style={styles.input}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    color: '#FF0000',
    textAlign: 'right',
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(BillInput);