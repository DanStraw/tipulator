import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { UPDATE_PRE_TIP_TOTAL, TOTAL_BILL_AUTO_UPDATE, TIP_TOTAL_AUTO_UPDATE, SHARES_VIEW_UPDATE_AUTO_AMOUNT } from './actions';

const mapStateToProps = state => {
  const { preTipTotal, tipPercentage, editableBill } = state;
  return { preTipTotal, tipPercentage, editableBill };
}

const mapDispatchToProps = dispatch => {
  return {
    updatePreTipTotal: val => dispatch({ type: UPDATE_PRE_TIP_TOTAL, text: val }),
    updateBillTotal: val => dispatch({ type: TOTAL_BILL_AUTO_UPDATE, data: { ...val } }),
    updateTipTotal: val => dispatch({ type: TIP_TOTAL_AUTO_UPDATE, data: { ...val } }),
    updateAutoSharesAmount: val => dispatch({ type: SHARES_VIEW_UPDATE_AUTO_AMOUNT, data: { ...val } })
  }
}

const PreTipTotalInput = props => {
  const { tipPercentage, editableBill } = props;
  const inputChangeEventHandler = function (value) {
    props.updatePreTipTotal(value);
    props.updateBillTotal({ tipPercentage: tipPercentage.toString(), preTipTotal: value });
    props.updateTipTotal({ tipPercentage, preTipTotal: value });
    props.updateAutoSharesAmount({ tipPercentage, preTipTotal: value })
  }


  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.dollarSign}>Pre-Tip Amount ($)</Text>
      </View>
      <View style={styles.inputWrap}>
        <TextInput
          placeholder="0.00"
          placeholderTextColor="white"
          value={props.preTipTotal}
          onChangeText={inputChangeEventHandler}
          style={styles.preTipTotalInput}
          editable={editableBill}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    // flex: 1,
    flexDirection: "row",
  },
  inputWrap: {
    flex: 1,
    borderColor: "#cccccc",
    borderBottomWidth: 1,
    marginBottom: 10
  },
  dollarSign: {
    display: 'inline',
    marginRight: '5px',
    float: 'left',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#ffffff'
  },
  preTipTotalInput: {
    textAlign: 'right',
    color: '#ffffff',
    textShadowColor: '#000000',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // color: 'white'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PreTipTotalInput);