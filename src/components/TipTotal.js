import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

const mapState = state => {
  const { tipTotal } = state;
  return { tipTotal };
}

const TipTotal = props => {
  const { tipTotal } = props;
  return (
    <Text testID="tip-amount">Tip Amount: ${tipTotal}</Text>
  )
}

export default connect(mapState)(TipTotal);