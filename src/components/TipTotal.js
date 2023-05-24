import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const mapState = state => {
  const { tipTotal } = state;
  return { tipTotal };
}

const TipTotal = props => {
  const { tipTotal } = props;
  return (
    <View style={styles.row}>
        <Text style={styles.tipTotalText}>Tip Total ($)</Text>
        <TextInput style={styles.tipTotalAmt} value={tipTotal} editable={false} />
    </View>
  
  )
}

const styles = StyleSheet.create({
  row: {
    // flex: 1,
    flexDirection: 'row'
  },
  tipTotalText: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    marginLeft: '2px',
    marginRight: '5px'
  },
  tipTotalAmt: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    textAlign: 'right'
  }
});

export default connect(mapState)(TipTotal);