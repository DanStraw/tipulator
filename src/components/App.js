import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import store from '../store';
import BillTotal from './BillTotal';
import BillInput from './BillInput';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <BillTotal />
        <BillInput />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
