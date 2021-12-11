import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import Share from './Share';
import { SHARES_VIEW_ADD_SHARE, SHARES_VIEW_UPDATE_AUTO_AMOUNT } from './actions';

const mapStateToProps = (state) => {
  const { totalBill, sharesView } = state;
  return { totalBill, sharesView };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addShare: val => dispatch({ type: SHARES_VIEW_ADD_SHARE, data: val }),
    updateAutoShareAmount: val => dispatch({ type: SHARES_VIEW_UPDATE_AUTO_AMOUNT, data: val }),

  }
}

const SharesView = props => {
  const { totalBill, sharesView } = props;
  let shareView;
  if (sharesView && sharesView.shares.length <= 1) {
    shareView = null;
  } else {
    shareView = sharesView.shares.map((share, i) => {
      return <Share shareIndex={i} key={i} />
    });
  }

  const addShareEventHandler = function () {
    props.addShare({
      totalBill, sharesView
    });
  }

  const resetSharesEventHandler = function () {
    console.log('reset Shares');
  }


  return (
    <View>
      {shareView}
      <View style={styles.buttonRow}>
        <View>
          <Button testID="add_share_button_test" title="Add a Share" onPress={addShareEventHandler}
            color={styles.add_share_button.color} />
        </View>
        <View >
          <Button testID="reset_shares_button_test" title="Reset Shares" onPress={resetSharesEventHandler} color={styles.reset_shares_button.color} />
        </View>
      </View>
    </View>

  )
}

const styles = {
  buttonRow: {
    flexDirection: 'row'
  },
  add_share_button: {
    color: "#097969"
  },
  reset_shares_button: {
    color: "#8b0000"
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SharesView);