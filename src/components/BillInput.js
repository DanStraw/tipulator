import React from 'react';
import { connect } from 'react-redux';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import { BILL_TOTAL_MANUAL_UPDATE, FORMAT, UPDATE_PRE_TIP_FROM_BILL_TOTAL, TIP_PERCENTAGE_BILL_UPDATE, TIP_TOTAL_AUTO_UPDATE, TIP_TOTAL_BILL_UPDATE, SHARES_VIEW_UPDATE_FROM_NEW_BILL_TOTAL } from './actions';

const mapStateToProps = (state) => {
  //console.log('state:', state);
  const { totalBill, preTipTotal, editableBill, tipPercentage } = state;
  return { totalBill, preTipTotal, editableBill, tipPercentage };
}

const mapDispatchToProps = (dispatch) => {
  return {
    manualUpdateBillTotal: (val) => dispatch({ type: BILL_TOTAL_MANUAL_UPDATE, text: val }),
    updatePreTipTotal: (val) => dispatch({ type: UPDATE_PRE_TIP_FROM_BILL_TOTAL, text: val }),
    format: (val) => dispatch({ type: FORMAT, text: val }),
    updateTipPercentage: val => dispatch({ type: TIP_PERCENTAGE_BILL_UPDATE, data: { ...val } }),
    updateTipTotal: val => dispatch({ type: TIP_TOTAL_BILL_UPDATE, data: { ...val } }),
    updateAutoShares: val => dispatch({ type: SHARES_VIEW_UPDATE_FROM_NEW_BILL_TOTAL, data: { ...val } })
  }
}

const BillInput = props => {
  // console.log('props', props);
  const { editableBill, tipPercentage } = props;
  const inputChangeEventHandler = function (value) {
    //  console.log('val:', value);
    let updatedBillTotal = value.split(",").join("");
    //  console.log('updatedBillTotal 1:', updatedBillTotal, updatedBillTotal.length);
    updatedBillTotal = updatedBillTotal.split(".").join("");
    if (updatedBillTotal.substring(updatedBillTotal.length - 2).length < 2) {
      updatedBillTotal = updatedBillTotal.substring(0, updatedBillTotal.length - 2) + ".0" + updatedBillTotal.substring(updatedBillTotal.length - 2);
    } else {
      updatedBillTotal = updatedBillTotal.substring(0, updatedBillTotal.length - 2) + "." + updatedBillTotal.substring(updatedBillTotal.length - 2);
    }

    // console.log('updatedBillTotal 2:', updatedBillTotal, updatedBillTotal.length, props.preTipTotal);
    const billTotalNum = parseFloat(updatedBillTotal);
    const preTipTotal = props.preTipTotal === "" ? "0.00" : props.preTipTotal;
    // console.log('before split:', preTipTotal);
    const preTipTotalNum = parseFloat(preTipTotal.split(",").join(""));
    //  console.log('updateBillTot:', updatedBillTotal);
    props.manualUpdateBillTotal(value);
    props.updatePreTipTotal({ billTotalNum, preTipTotalNum, tipPercentage });
    console.log('perc:', billTotalNum, tipPercentage);
    props.updateTipPercentage({ billTotalNum, preTipTotalNum });
    props.updateTipTotal({ billTotalNum, tipPercentage });
    props.updateAutoShares({ totalBill: value });
  }

  const blurEventHandler = (event) => {
    props.format(event.target.value);
  }

  return (
    <View style={styles.row}>
      <Text style={styles.billTotalText}>
        Bill Total ($)
      </Text>
      <TextInput
        value={props.totalBill}
        keyboardType='numeric'
        onChangeText={inputChangeEventHandler}
        onBlur={blurEventHandler}
        placeHolder="0.00"
        placeholderTextColor="#ff00ff"
        style={styles.input}
        editable={editableBill}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    // flex: 1,
    flexDirection: 'row'
  },
  input: {
    textAlign: 'right',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white'
  },
  billTotalText: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    marginLeft: '2px',
    marginRight: '5px'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(BillInput);