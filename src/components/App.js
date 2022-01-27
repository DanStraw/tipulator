import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View, ImageBackground } from 'react-native';
import store from '../store';
import BillTotal from './BillTotal';
import BillInput from './BillInput';
import TipTotal from './TipTotal';
import PreTipTotalInput from './PreTipTotalInput';
import TipPercentage from './TipPercentage';
import SharesView from './SharesView';

const image = { uri: require("../../assets/money.jpg") };

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <PreTipTotalInput />
          <TipPercentage />
          <TipTotal />
          <BillTotal />
          <BillInput />
          <SharesView />
          <StatusBar style="auto" />
        </ImageBackground>
      </View>
    </Provider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.7
  },
});
