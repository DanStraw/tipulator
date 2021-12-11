import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { SHARE_UPDATE_MANUAL_SHARE, SHARES_VIEW_MANUAL_UPDATE } from './actions';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleUp, faAngleDown, faDollarSign, faPercent } from '@fortawesome/free-solid-svg-icons';

const mapStateToProps = (state) => {
  // console.log('share state - sv:', state)
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateManualShareAmount: val => dispatch({ type: SHARES_VIEW_MANUAL_UPDATE, data: { ...val } })
  }
}

const Share = props => {
  const { sharesView, shareIndex, preTipTotal, tipPercentage } = props;
  const { shareAmount, percentTotal } = sharesView.shares[shareIndex];

  const buttonPressHandler = function (val, type) {
    const data = {
      preTipTotal, tipPercentage, shareIndex
    }
    switch (type) {
      case 'dollar':
        const dollarChangeAmount = val;
        props.updateManualShareAmount({ dollarChangeAmount, ...data });
        break;
      case 'percent':
        const percentChangeAmount = val;
        props.updateManualShareAmount({ percentChangeAmount, ...data });
        break;
      default:
        break;
    }
  }

  return (
    <View style={styles.shareViewOuterLayout}>

      <View style={styles.buttonLayout}>
        <Button
          onPress={() => buttonPressHandler(1, 'dollar')}
          color={styles.incrementButton.color}
          style={styles.incrementButton}
          title="Up">
        </Button>

        {/* Button Title - <FontAwesomeIcon icon={faAngleUp} /> */}

        {/* <View><FontAwesomeIcon icon={faDollarSign} /> </View> */}
        <View style={styles.decrementButton}>
          <Button

            onPress={() => buttonPressHandler(-1, 'dollar')}
            color={styles.incrementButton.color}
            style={styles.icon}
            title="down">
          </Button>

          {/* Button Title - <FontAwesomeIcon icon={faAngleDown}  */}

        </View>
      </View>

      <View>
        <Text>Share {shareIndex + 1}: {shareAmount} - {percentTotal}%</Text>
      </View>

      <View style={styles.buttonLayout}>
        <Button
          color={styles.incrementButtonColor.color}
          onPress={() => buttonPressHandler(0.1, 'percent')}
          style={styles.incrementButton}
          title="Up" >
        </Button>
        {/* <View><FontAwesomeIcon icon={faPercent} /> </View> */}
        <View style={styles.decrementButton}>
          <Button title="down"
            onPress={() => buttonPressHandler(-0.1, 'percent')}>

          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = {
  incrementButton: {
    marginBottom: 5,
    color: 'lightgrey',
  },
  decrementButton: {
    opacity: 0.8
  },
  incrementButtonColor: {
    marginBottom: 5,
    color: 'lightgrey',
  },
  icon: {
    color: "white",
  },
  test: {
    color: 'green'
  },
  shareViewOuterLayout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px black solid'
  },
  buttonLayout: {
    margin: 5
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Share);