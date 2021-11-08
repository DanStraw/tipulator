import React from 'react';
import { connect } from 'react-redux';
import { TextInput, StyleSheet } from 'react-native';
import { BILL_TOTAL_MANUAL_UPDATE, FORMAT, TIP_PERCENTAGE_UPDATE, TIP_TOTAL_AUTO_UPDATE } from './actions';

const mapStateToProps = (state) => {
  const { totalBill, preTipTotal } = state;
  return { totalBill, preTipTotal };
}

const mapDispatchToProps = (dispatch) => {
  return {
    manualUpdateBillTotal: (val) => dispatch({ type: BILL_TOTAL_MANUAL_UPDATE, text: val }),
    format: (val) => dispatch({ type: FORMAT, text: val }),
    updateTipPercentage: val => dispatch({ type: TIP_PERCENTAGE_UPDATE, text: val }),
    updateTipTotal: val => dispatch({ type: TIP_TOTAL_AUTO_UPDATE, data: { ...val } })
  }
}

const BillInput = props => {

  const inputChangeEventHandler = function (value) {
    props.manualUpdateBillTotal(value);
    // console.log("--------\n" + value);
    const preTipTotal = props.preTipTotal === "" ? "0.00" : props.preTipTotal;
    const billTotalInt = parseFloat(value.split(",").join(""));
    const preTipTotalInt = parseFloat(preTipTotal.split(",").join(""));
    // console.log('bt', billTotalInt, "ptti:", preTipTotalInt);
    // console.log('preTipInt', preTipTotalInt);
    const tipPercentageFloat = preTipTotalInt === 0 ? 100.0 : ((billTotalInt / preTipTotalInt) - 1) * 100;
    // console.log('flaoat:', tipPercentageFloat);
    const tipPercString = tipPercentageFloat.toFixed(1).toString();
    //console.log('string:', tipPercString);
    props.updateTipPercentage(tipPercString);
    props.updateTipTotal({ tipPercentage: tipPercString, preTipTotal });
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
    // backgroundColor: "#ECECEC",
    color: '#FF0000',
    textAlign: 'right',
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(BillInput);