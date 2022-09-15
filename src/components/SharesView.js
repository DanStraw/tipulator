import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Button, Dimensions } from 'react-native';
import Carousel from 'react-native-anchor-carousel';
import Share from './Share';
import { SHARES_VIEW_ADD_SHARE, SHARES_VIEW_UPDATE_AUTO_AMOUNT, SHARES_VIEW_RESET_SHARES } from './actions';

const { width: windowWidth } = Dimensions.get('window');

const mapStateToProps = (state) => {
  const { totalBill, sharesView } = state;
  return { totalBill, sharesView };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addShare: val => dispatch({ type: SHARES_VIEW_ADD_SHARE, data: val }),
    updateAutoShareAmount: val => dispatch({ type: SHARES_VIEW_UPDATE_AUTO_AMOUNT, data: val }),
    resetShares: val => {
      return dispatch({ type: SHARES_VIEW_RESET_SHARES, data: val });
    }

  }
}

const SharesView = props => {
  const { totalBill, sharesView } = props;
  let shareView;
  let sharesResetDisabled = true;

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}>
        <Share shareIndex={index} key={index} />
      </TouchableOpacity>
    );
  }

  if (sharesView && sharesView.shares.length <= 1) {
    sharesResetDisabled = true;
    shareView = null;
  } else {
    sharesView.shares.forEach(share => {
      if (share.isManual) sharesResetDisabled = false;
    });
    shareView = (
      <Carousel
        data={sharesView.shares}
        renderItem={renderItem}
        style={styles.carousel}
        itemWidth={windowWidth * 0.75}
        containerWidth={windowWidth}
        separatorWidth={0}
      />
    );
  }

  const addShareEventHandler = function () {
    props.addShare({
      totalBill, sharesView
    });
  }

  const resetSharesEventHandler = function () {
    props.resetShares({ totalBill });
  }

  const carouselRef = React.useRef(null);
  return (
    <View>
      <View style={styles.buttonRow}>
        <View>
          <Button disabled={totalBill === '0.00' || totalBill === '' ? true : false} testID="add_share_button_test" title="Add a Share" onPress={addShareEventHandler}
            color={styles.add_share_button.color} 
            />
        </View>
        <View >
          <Button 
          disabled={sharesResetDisabled}
            testID="reset_shares_button_test" title="Reset Shares" onPress={resetSharesEventHandler} color={styles.reset_shares_button.color}
            style={styles.reset_shares_button} />
        </View>
      </View>
            <View>
        {shareView}
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
  },
  carousel: {
    flexGrow: 0,
    height: "auto",
    backgroundColor: 'rgba(178,199,138, 0.5)',
    // opacity: 1,
    // borderWidth: 1,
    // borderColor: '#283f2a',
  },
  item: {
    borderWidth: 1,
    borderRadius: '3px',
    backgroundColor: 'rgba(99,99,95, 0.8)',
    borderColor: '#283f2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '5px',
    marginRight: '5px'
  },

}

export default connect(mapStateToProps, mapDispatchToProps)(SharesView);