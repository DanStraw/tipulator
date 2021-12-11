import React from 'react';
import { connect } from 'react-redux';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { TIP_PERCENTAGE_UPDATE, TOTAL_BILL_AUTO_UPDATE, TIP_TOTAL_AUTO_UPDATE, SHARES_VIEW_TIP_PERCENTAGE_CHANGE } from './actions';

const mapStateToProps = state => {
  const { tipPercentage, preTipTotal } = state;
  return { tipPercentage, preTipTotal };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateTipPercentage: val => dispatch({ type: TIP_PERCENTAGE_UPDATE, text: val }),
    updateBillTotal: val => dispatch({ type: TOTAL_BILL_AUTO_UPDATE, data: { ...val } }),
    updateTipTotal: val => dispatch({ type: TIP_TOTAL_AUTO_UPDATE, data: { ...val } }),
    updateShares: val => dispatch({ type: SHARES_VIEW_TIP_PERCENTAGE_CHANGE, data: { ...val } })
  }
}

const TipPercentage = props => {
  const { preTipTotal } = props;

  const inputChangeEventHandler = (value) => {
    props.updateTipPercentage(value);
    props.updateBillTotal({ tipPercentage: value, preTipTotal });
    props.updateTipTotal({ tipPercentage: value, preTipTotal });
    props.updateShares({ tipPercentage: value, preTipTotal });
  }

  return (
    <View testID="tipPercentageComponent" style={styles.row}>
      <TextInput
        style={styles.tipPercentage}
        value={props.tipPercentage}
        keyboardType='numeric'
        onChangeText={inputChangeEventHandler}
      />
      <Text>%</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    // flex: 1,
    flexDirection: 'row'
  },
  tipPercentage: {
    textAlign: 'right',
    borderColor: "#cccccc",
    borderBottomWidth: 1,
    marginLeft: '20px'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TipPercentage);