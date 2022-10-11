import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
        <Text style={styles.billTotalText} testID="total-bill" total-bill="0.00">$0.00</Text>
      </View>
    )
  }

  return (
    <View>
      <View>
        <Text style={styles.dollarSign}>$</Text>
      </View>
      <View>
        <Text testID="total-bill" style={styles.billTotalText}>{totalBill}</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  billTotalText: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
  },
  dollarSign: {
    display: 'flex',
    marginRight: '5px',
    // float: 'left',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white'
  }
});

export default connect(mapState)(BillTotal);