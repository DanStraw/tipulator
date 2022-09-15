import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const mapState = state => {
  const { tipTotal } = state;
  return { tipTotal };
}

const TipTotal = props => {
  const { tipTotal } = props;
  return (
    <Text testID="tip-amount" style={styles.tipTotalText}
    >Tip Amount: ${tipTotal}</Text>
  )
}

const styles = StyleSheet.create({
  tipTotalText: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
  }
});

export default connect(mapState)(TipTotal);