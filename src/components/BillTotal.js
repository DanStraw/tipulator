import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const mapState = state => {
  const { totalBill } = state;
  return { totalBill };
}

const BillTotal = props => {
  const { totalBill } = props;
  if (!totalBill) {
    return (
      <View>
        <Text testID="total-bill" total-bill="0.00">$0.00</Text>
      </View>
    )
  }

  return (
    <View>
      <Text>$</Text><Text testID="total-bill">{totalBill}</Text>
    </View>
  )
}

export default connect(mapState)(BillTotal);