import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, TouchableNativeFeedback, TouchableOpacity, Pressable } from 'react-native';
import { Card, Chip } from 'react-native-elements';
import { SHARES_VIEW_DELETE_SHARE, SHARES_VIEW_MANUAL_UPDATE, SHARES_VIEW_RESET_SHARE, EDITABLE_BILL_UPDATE } from './actions';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleUp, faAngleDown, faAngleDoubleUp, faAngleDoubleDown, faDollarSign, faPercent, faUndo, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateManualShareAmount: val => dispatch({ type: SHARES_VIEW_MANUAL_UPDATE, data: { ...val } }),
    updateBillInputEditable: val => dispatch({ type: EDITABLE_BILL_UPDATE, data: { ...val } }),
    deleteShare: val => dispatch({ type: SHARES_VIEW_DELETE_SHARE, data: val }),
    resetShare: val => dispatch({ type: SHARES_VIEW_RESET_SHARE, data: val })
  }
}

let shortInterval;
let longInterval;
let count = 0;

const Share = props => {

  const { sharesView, shareIndex, preTipTotal, tipPercentage, totalBill, editableBill } = props;
  const { shareAmountText, percentTotal } = sharesView.shares[shareIndex];

  let autoShareCount = 0;
  sharesView.shares.forEach(share => {
    autoShareCount = share.isManual ? autoShareCount : autoShareCount + 1;
  });
  const canBeManual = (sharesView.shares[shareIndex].isManual || autoShareCount > 1) ? true : false;

  const share = sharesView.shares[shareIndex];

  const updateShareData = function (val, type) {
    const data = {
      preTipTotal, tipPercentage, shareIndex, editableBill
    };

    const editableData = {
      ...data, shares: sharesView.shares
    };
    switch (type) {
      case 'dollar':
        const dollarChangeAmount = val;

        props.updateManualShareAmount({ dollarChangeAmount, ...data });
        props.updateBillInputEditable({ dollarChangeAmount, ...editableData });
        break;
      case 'percent':
        const percentChangeAmount = val;
        props.updateManualShareAmount({ percentChangeAmount, ...data });
        props.updateBillInputEditable({ percentChangeAmount, ...editableData });
        break;
      default:
        break;
    }
  }

  const buttonPressHandler = function (val, type) {
    updateShareData(val, type);
    shortInterval = setInterval(() => {
      updateShareData(val, type);
    }, 500);
    setTimeout(function () {
      if (shortInterval) {
        clearInterval(shortInterval);
        shortInterval = false;
      }
    }, 1000);
  }

  const buttonLongPressHandler = function (val, type) {
    longInterval = setInterval(() => {
      updateShareData(val, type);
    }, 50);
  }

  const buttonReleaseHandler = function () {
    clearInterval(shortInterval);
    shortInterval = false;
    clearInterval(longInterval);
    longInterval = false;
  }

  const shareResetEventHandler = function () {
    props.resetShare({ shareIndex, totalBill });
  }

  const shareDeleteEventHandler = function () {
    props.deleteShare({ shareIndex, totalBill })
  }
  return (
    <View style={styles.shareViewOuterLayout}>
      <Card
        title="test feature"
        id="new_id">
        <Card.Title>Share {shareIndex + 1}</Card.Title>
        <Card.Divider />

        <View style={[styles.container, { width: 'auto' }]}>
          <View style={styles.container_item}>
            <View style={styles.buttonLayout}>

              <View style={styles.pressable}>
                <Pressable
                  onPressIn={() => { buttonPressHandler(-0.01, 'dollar') }}
                  onPressOut={buttonReleaseHandler}
                  onLongPress={() => { buttonLongPressHandler(-0.01, 'dollar') }}
                  delayLongPress={1000}
                >
                  <View style={styles.button}><Text><FontAwesomeIcon icon={faAngleDown} /></Text></View>
                </Pressable>
              </View>
            </View>

            <View style={styles.buttonLayout}>

            </View>
          </View>
          <View style={[styles.container_item, { alignSelf: 'center' }]}><Text>${shareAmountText}</Text>
          </View>
          <View style={[styles.container_item, { position: 'relative', right: '0px' }]}>
            <View style={styles.buttonLayout}>
              <View style={styles.pressable}>
                <Pressable
                  onPressIn={() => { buttonPressHandler(0.01, 'dollar') }}
                  onPressOut={buttonReleaseHandler}
                  onLongPress={() => { buttonLongPressHandler(0.01, 'dollar') }}
                  delayLongPress={1000}
                >
                  <View style={styles.button}><Text><FontAwesomeIcon icon={faAngleUp} /></Text></View>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.container, { width: 'auto' }]}>
          <View style={[styles.container_item, { width: 'auto' }]}>
            <View style={styles.buttonLayout}>
              <View style={styles.pressable}>
                <Pressable
                  onPressIn={() => { buttonPressHandler(-0.1, 'percent') }}
                  onPressOut={buttonReleaseHandler}
                  onLongPress={() => { buttonLongPressHandler(-0.1, 'percent') }}
                  delayLongPress={1000}
                >
                  <View style={styles.button}><Text><FontAwesomeIcon icon={faAngleDown} /></Text></View>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={[styles.container_item, { alignSelf: 'center', position: 'absolute', left: '0px', right: '0px', zIndex: '-1' }]}>
            <Text style={styles.percentTotalText}>{percentTotal}%</Text>
          </View>
          <View style={[styles.container_item, { position: 'absolute', right: '0px', width: 'auto' }]}>
            <View style={styles.buttonLayout}>
              <View style={styles.pressable}>
                <Pressable
                  onPressIn={() => { buttonPressHandler(0.1, 'percent') }}
                  onPressOut={buttonReleaseHandler}
                  onLongPress={() => { buttonLongPressHandler(0.1, 'percent') }}
                  delayLongPress={1000}
                >
                  <View style={styles.button}><Text><FontAwesomeIcon icon={faAngleUp} /></Text></View>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.container, { width: 'auto' }]}>
          <View style={[styles.container_item, { width: 'auto' }]}>
            <View style={styles.buttonLayout}>
              <View style={styles.button}>
                <Button
                  title={<FontAwesomeIcon icon={faTrashAlt} />}
                  onPress={shareDeleteEventHandler}
                  color={styles.deleteButton.color}
                  style={styles.deleteButton} />
              </View>
            </View>
          </View>
          <View style={[styles.container_item, { width: 'auto', position: 'absolute', right: '0px' }]}>
            <View style={[styles.button]}>
              <Button
                disabled={!props.sharesView.shares[shareIndex].isManual}
                title={<FontAwesomeIcon icon={faUndo} />}
                onPress={shareResetEventHandler}
                color={styles.resetShareButton.color}
                style={styles.resetShareButton}>
              </Button>
            </View>
          </View>
        </View>
      </Card>
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
    color: 'blue'
  },
  incrementButtonColor: {
    marginBottom: 5,
    color: 'lightgrey',
  },
  resetShareButton: {
    color: 'orange',
    right: '0px'
  },
  deleteButton: {
    color: 'red'
  },
  icon: {
    color: "white",
  },
  shareViewOuterLayout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    //border: '1px black solid',
    padding: '10px'
  },
  buttonLayout: {
    marginBottom: 5
  },
  buttonSet: {
    flex: 1,
    flexDirection: "row",
  },
  button: {
    alignItems: 'center',
    borderRadius: '3px',
    // padding: '2px'
  },
  pressable: {
    backgroundColor: 'blue',
    alignItems: 'center',
    borderRadius: '3px',
    padding: '2px'
  },
  changeTypeSymbol: {
    alignItems: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container_item: {
    padding: 2,
  },
  percentTotalText: {
    margin: 'auto'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Share);