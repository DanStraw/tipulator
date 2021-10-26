import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

const mapState = state => {
  const { totalBill } = state;
  return { totalBill };
}

const BillTotal = props => {
  const { totalBill } = props;
  if (!totalBill) {
    return (
      <Text testID="total-bill">$0.00</Text>
    )
  }

  return (
    <Text testID="total-bill">${totalBill}</Text>
  )
}

export default connect(mapState)(BillTotal);