import React from 'react';
import { connect } from 'react-redux';
import { TextInput, StyleSheet } from 'react-native';
import { MANUAL, FORMAT } from './actions';

const mapStateToProps = (state) => {
  const { totalBill } = state;
  return { totalBill };
}

const mapDispatchToProps = (dispatch) => {
  return {
    manual: (val) => dispatch({ type: MANUAL, text: val }),
    format: (val) => dispatch({ type: FORMAT, text: val })
  }
}

const BillInput = props => {

  const inputChangeEventHandler = function (value) {
    props.manual(value);
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
    backgroundColor: "#ECECEC",
    color: '#FF0000',
    textAlign: 'right'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(BillInput);