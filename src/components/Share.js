import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { SHARE_UPDATE_MANUAL_SHARE, SHARES_VIEW_MANUAL_UPDATE } from './actions';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleUp, faAngleDown, faAngleDoubleUp, faAngleDoubleDown, faDollarSign, faPercent } from '@fortawesome/free-solid-svg-icons';

const mapStateToProps = (state) => {
  // console.log('share state - sv:', state)
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateManualShareAmount: val => dispatch({ type: SHARES_VIEW_MANUAL_UPDATE, data: { ...val } }),
    resetShares: val => dispatch
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

        <View style={styles.buttonSet}>
          <View style={styles.button}>
            <Button
              onPress={() => buttonPressHandler(1, 'dollar')}
              color={styles.incrementButton.color}
              style={styles.incrementButton}
              title={<FontAwesomeIcon icon={faAngleDoubleUp} />}>
            </Button>
          </View>
          <View style={styles.button}>
            <Button
              onPress={() => buttonPressHandler(0.01, 'dollar')}
              color={styles.incrementButton.color}
              style={styles.incrementButton}
              title={<FontAwesomeIcon icon={faAngleUp} />}>
            </Button>
          </View>

        </View>

        <View style={styles.changeTypeSymbol}><FontAwesomeIcon icon={faDollarSign} /> </View>
        <View style={styles.decrementButton}>
          <View style={styles.buttonSet}>
            <View style={styles.button}>
              <Button

                onPress={() => buttonPressHandler(-1, 'dollar')}
                color={styles.decrementButton.color}
                style={styles.decrementButton}
                title={<FontAwesomeIcon icon={faAngleDoubleDown} />}>
              </Button>
            </View>
            <View style={styles.buton}>
              <Button

                onPress={() => buttonPressHandler(-0.01, 'dollar')}
                color={styles.decrementButton.color}
                style={styles.decrementButton}
                title={<FontAwesomeIcon icon={faAngleDown} />}>
              </Button>
            </View>
          </View>
        </View>
      </View>

      <View>
        <Text style={{ fontWeight: 'bold' }}>Share {shareIndex + 1}</Text>
        <Text>${shareAmount}</Text>
        <Text>{percentTotal}%</Text>
      </View>

      <View style={styles.buttonLayout}>
        <View style={styles.buttonSet}>

          <View style={styles.button}>
            <Button
              color={styles.incrementButton.color}
              onPress={() => buttonPressHandler(1.0, 'percent')}
              style={styles.incrementButton}
              title={<FontAwesomeIcon icon={faAngleDoubleUp} />} >
            </Button>
          </View>
          <View style={styles.button}>
            <Button
              color={styles.incrementButton.color}
              title={<FontAwesomeIcon icon={faAngleUp} />}
              style={styles.incrementButton}
              onPress={() => buttonPressHandler(0.1, 'percent')}>
            </Button>
          </View>
        </View>
        <View style={styles.changeTypeSymbol}><FontAwesomeIcon icon={faPercent} /> </View>

        <View style={styles.buttonSet}>
          <View style={styles.button}>
            <Button
              color={styles.decrementButton.color}
              onPress={() => buttonPressHandler(-1.0, 'percent')}
              style={styles.decrementButton}
              title={<FontAwesomeIcon icon={faAngleDoubleDown} />} >
            </Button>
          </View>
          <View style={styles.button}>
            <Button
              color={styles.decrementButton.color}
              onPress={() => buttonPressHandler(-0.1, 'percent')}
              style={styles.decrementButton}
              title={<FontAwesomeIcon icon={faAngleDown} />} >
            </Button>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = {
  incrementButton: {
    color: 'forestgreen',
    border: '2px black solid'
  },
  decrementButton: {
    opacity: 0.8,
    color: 'maroon'
  },
  incrementButtonColor: {
    marginBottom: 5,
    color: 'lightgrey',
  },
  icon: {
    color: "white",
  },
  shareViewOuterLayout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px black solid'
  },
  buttonLayout: {
    marginBottom: 5
  },
  buttonSet: {
    flex: 1,
    flexDirection: "row"
  },
  button: {
    marginRight: '2px'
  },
  changeTypeSymbol: {
    alignItems: 'center'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Share);