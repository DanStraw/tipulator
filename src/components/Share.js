import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { Card, Chip } from 'react-native-elements';
import { SHARES_VIEW_DELETE_SHARE, SHARES_VIEW_MANUAL_UPDATE, SHARES_VIEW_RESET_SHARE } from './actions';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleUp, faAngleDown, faAngleDoubleUp, faAngleDoubleDown, faDollarSign, faPercent, faUndo, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateManualShareAmount: val => dispatch({ type: SHARES_VIEW_MANUAL_UPDATE, data: { ...val } }),
    deleteShare: val => dispatch({ type: SHARES_VIEW_DELETE_SHARE, data: val }),
    resetShare: val => dispatch({ type: SHARES_VIEW_RESET_SHARE, data: val })
  }
}



const Share = props => {

  const { sharesView, shareIndex, preTipTotal, tipPercentage, totalBill } = props;
  const { shareAmountText, percentTotal } = sharesView.shares[shareIndex];

  // let percentTextWidth;
  // const measureView = function (event) {
  //   // console.log('event properties: ', event);
  //   // console.log('width: ', event.nativeEvent.layout.width);
  //   percentTextWidth = event.nativeEvent.layout.width.toString();
  //   console.log('per:', percentTextWidth);
  // }


  let autoShareCount = 0;
  sharesView.shares.forEach(share => {
    autoShareCount = share.isManual ? autoShareCount : autoShareCount + 1;
  });
  const canBeManual = (sharesView.shares[shareIndex].isManual || autoShareCount > 1) ? true : false;

  const share = sharesView.shares[shareIndex];

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
              <View style={styles.button}>
                <Chip
                  icon={{
                    name: 'angle-double-up',
                    type: 'font-awesome',
                    size: 10,
                    color: 'white'
                  }}></Chip>
              </View>
            </View>

            <View style={styles.buttonLayout}>
              <View style={styles.button}>
                <Chip
                  icon={{
                    name: 'angle-double-down',
                    type: 'font-awesome',
                    size: 10,
                    color: 'white'
                  }}></Chip>
              </View>
            </View>
          </View>
          <View style={[styles.container_item, { alignSelf: 'flex-start', top: '18px' }]}><Text>${shareAmountText}</Text>
          </View>
          <View style={[styles.container_item, { position: 'relative', right: '0px' }]}>
            <View style={styles.buttonLayout}>
              <View style={styles.button}>
                <Chip
                  icon={{
                    name: 'angle-up',
                    type: 'font-awesome',
                    size: 10,
                    color: 'white'
                  }}></Chip>
              </View>
            </View>

            <View style={styles.buttonLayout}>
              <View style={styles.button}>
                <Chip
                  icon={{
                    name: 'angle-down',
                    type: 'font-awesome',
                    size: 10,
                    color: 'white'
                  }}></Chip>
              </View>
            </View>
          </View>
        </View>

        <Card.Divider />

        <View style={[styles.container, { width: 'auto' }]}>
          <View style={styles.container_item}>
            <View style={styles.buttonLayout}>
              <View style={styles.button}>
                <Chip
                  icon={{
                    name: 'angle-double-up',
                    type: 'font-awesome',
                    size: 10,
                    color: 'white'
                  }}></Chip>
              </View>
            </View>

            <View style={styles.buttonLayout}>
              <View style={styles.button}>
                <Chip
                  icon={{
                    name: 'angle-double-down',
                    type: 'font-awesome',
                    size: 10,
                    color: 'white'
                  }}></Chip>
              </View>
            </View>
          </View>
          <View style={[styles.container_item, { alignSelf: 'center', position: 'absolute', left: '0px', right: '0px' }]}>
            <Text style={styles.percentTotalText}>{percentTotal}%</Text>
          </View>
          <View style={[styles.container_item, { position: 'absolute', right: '0px', width: 'auto' }]}>
            <View style={styles.buttonLayout}>
              <View style={styles.button}>
                <Chip
                  icon={{
                    name: 'angle-up',
                    type: 'font-awesome',
                    size: 10,
                    color: 'white'
                  }}></Chip>
              </View>
            </View>

            <View style={styles.buttonLayout}>
              <View style={styles.button}>
                <Chip
                  icon={{
                    name: 'angle-down',
                    type: 'font-awesome',
                    size: 10,
                    color: 'white'
                  }}></Chip>
              </View>
            </View>
          </View>
        </View>

        {/* <Text>${shareAmountText}</Text>
        
        <View style={styles.buttonLayout}> 
        <View style={styles.button}>
          <Chip
            icon={{
              name: 'angle-double-up',
              type: 'font-awesome',
              size: 10,
              color: 'white'
            }}></Chip>
        </View>

        </View>*/}

      </Card>
      {/* <View style={styles.buttonLayout}>

        <View style={styles.buttonSet}>
          <View style={styles.button}>
            <Button
              disabled={!canBeManual || !share.dollarLargeIncrementAllowed}
              onPress={() => buttonPressHandler(1, 'dollar')}
              color={styles.incrementButton.color}
              style={styles.incrementButton}
              title={<FontAwesomeIcon icon={faAngleDoubleUp} />}
            >
            </Button>
          </View>
          <View style={styles.button}>
            <Button
              disabled={!canBeManual || !share.dollarSmallIncrementAllowed}
              onPress={() => buttonPressHandler(0.01, 'dollar')}
              color={styles.incrementButton.color}
              style={styles.incrementButton}
              title={<FontAwesomeIcon icon={faAngleUp} />}
            >
            </Button>
          </View>

        </View>

        <View style={styles.changeTypeSymbol}>
          <FontAwesomeIcon icon={faDollarSign} />
        </View>
        <View style={styles.decrementButton}>
          <View style={styles.buttonSet}>


            <View style={styles.button}>
              <Button
                disabled={!canBeManual || !share.dollarLargeDecrementAllowed}
                onPress={() => buttonPressHandler(-1, 'dollar')}
                color={styles.decrementButton.color}
                style={styles.decrementButton}
                title={<FontAwesomeIcon icon={faAngleDoubleDown} />}
              >
              </Button>
            </View>

            <View style={styles.buton}>
              <Button
                disabled={!canBeManual || !share.dollarSmallDecrementAllowed}
                onPress={() => buttonPressHandler(-0.01, 'dollar')}
                color={styles.decrementButton.color}
                style={styles.decrementButton}
                title={<FontAwesomeIcon icon={faAngleDown} />}
              >
              </Button>
            </View>
          </View>
        </View>
      </View>


      <View>
        <Text style={{ fontWeight: 'bold' }}>Share {shareIndex + 1}</Text>
        <Text>${shareAmountText}</Text>
        <Text>{percentTotal}%</Text>
        <View style={styles.buttonSet}>
          <View style={styles.button}>
            <Button
              title={<FontAwesomeIcon icon={faTrashAlt} />}
              onPress={shareDeleteEventHandler}
              color={styles.deleteButton.color}
              style={styles.deleteButton} />
          </View>
          <View style={styles.button}>
            <Button
              disabled={!props.sharesView.shares[shareIndex].isManual}
              title={<FontAwesomeIcon icon={faUndo} />}
              onPress={shareResetEventHandler}
              color={styles.resetButton.color}
              style={styles.resetButton}>
            </Button>
          </View>
        </View>
      </View>

      <View style={styles.buttonLayout}>
        <View style={styles.buttonSet}>

          <View style={styles.button}>
            <Button
              disabled={!canBeManual || !share.percentLargeIncrementAllowed}
              color={styles.incrementButton.color}
              onPress={() => buttonPressHandler(1.0, 'percent')}
              style={styles.incrementButton}
              title={<FontAwesomeIcon icon={faAngleDoubleUp} />}
            >
            </Button>
          </View>
          <View style={styles.button}>
            <Button
              disabled={!canBeManual || !share.percentSmallIncrementAllowed}
              color={styles.incrementButton.color}
              title={<FontAwesomeIcon icon={faAngleUp} />}
              style={styles.incrementButton}
              onPress={() => buttonPressHandler(0.1, 'percent')}>
            </Button>
          </View>
        </View>
        <View style={styles.changeTypeSymbol}>
          <FontAwesomeIcon icon={faPercent} />
        </View>

        <View style={styles.buttonSet}>
          <View style={styles.button}>
            <Button
              disabled={!canBeManual || !share.percentLargeDecrementAllowed}
              color={styles.decrementButton.color}
              onPress={() => buttonPressHandler(-1.0, 'percent')}
              style={styles.decrementButton}
              title={<FontAwesomeIcon icon={faAngleDoubleDown} />}
            >
            </Button>
          </View>
          <View style={styles.button}>
            <Button
              disabled={!canBeManual || !share.percentSmallDecrementAllowed}
              color={styles.decrementButton.color}
              onPress={() => buttonPressHandler(-0.1, 'percent')}
              style={styles.decrementButton}
              title={<FontAwesomeIcon icon={faAngleDown} />}
            >
            </Button>
          </View>
        </View>
      </View> */}

    </View >
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
  resetButton: {
    color: 'orange'
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
    flexDirection: "row"
  },
  button: {
    marginRight: '2px'
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
    // flex: 1, //why this doesnt work???
    // width: 150, //using fixed item width instead of flex: 0.5 works
    // height: 'auto',
    // width: 'auto',
    padding: 2,
    // backgroundColor: 'red',
    // flexGrow: 1,
    // flexShrink: 0,
  },
  percentTotalText: {
    margin: 'auto'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Share);