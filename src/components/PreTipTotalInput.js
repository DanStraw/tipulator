import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { UPDATE_PRE_TIP_TOTAL, TOTAL_BILL_AUTO_UPDATE, TIP_TOTAL_AUTO_UPDATE } from './actions';

const mapStateToProps = state => {
  const { preTipTotal, tipPercentage } = state;
  return { preTipTotal, tipPercentage };
}

const mapDispatchToProps = dispatch => {
  return {
    updatePreTipTotal: val => dispatch({ type: UPDATE_PRE_TIP_TOTAL, text: val }),
    updateBillTotal: val => dispatch({ type: TOTAL_BILL_AUTO_UPDATE, data: { ...val } }),
    updateTipTotal: val => dispatch({ type: TIP_TOTAL_AUTO_UPDATE, data: { ...val } })
  }
}

const PreTipTotalInput = props => {
  const { tipPercentage } = props;

  const inputChangeEventHandler = function (value) {
    props.updatePreTipTotal(value);
    props.updateBillTotal({ tipPercentage: tipPercentage.toString(), preTipTotal: value });
    props.updateTipTotal({ tipPercentage, preTipTotal: value });
  }


  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.dollarSign}>$</Text>
      </View>
      <View style={styles.inputWrap}>
        <TextInput
          placeholder="preTipTotalInput"
          value={props.preTipTotal}
          onChangeText={inputChangeEventHandler}
          style={styles.preTipTotalInput}
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
    float: 'left'
  },
  preTipTotalInput: {
    textAlign: 'right'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PreTipTotalInput);